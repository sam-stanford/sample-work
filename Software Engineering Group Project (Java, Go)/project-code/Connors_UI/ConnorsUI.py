import asyncio
import subprocess
import pygame as pg
import time

from GameConnector import stream_read_json2

class Card:
    def __init__(self, str):
        self.str = str

    def render(self, font):
        c = font.render(self.str, False, (255, 255, 255))
        return c

    def __str__(self):
        return self.str

class UsersHand:
    def __init__(self, hand=[Card("AB"), Card("JK"), Card("XY")], size=20, highlight=5):
        # The cards
        self.hand = hand
        self.size = 20
        self.highlight = 5

    def updateWithGameState(self, gameState):
        """
        Update the users hand based on the gameState
        :param gameState:
        :return:
        """
        self.hand = []

        for cardString in gameState["cards_in_hand"]:
            self.hand.append(Card(cardString))

    def update(self, screen, font):
        """
        Update the highlights of cards, for a nice hover over effect.
        TODO: Make so only highlight if card is playable.
        :param screen:
        :return:
        """
        handStart = (40, 180 - self.size)
        interval = 40
        i = 0
        for card in self.hand:

            # The top left position of this card
            pos = (handStart[0] + 40*i, handStart[1])

            # Rect the size of
            renderCard = card.render(font)
            crect = renderCard.get_rect()
            crect.left = pos[0]
            crect.top = pos[1]

            if (crect.collidepoint(pg.mouse.get_pos())):
                screen.blit(renderCard, (crect[0], crect[1] - (self.highlight)))
            else:
                screen.blit(renderCard, (crect[0], crect[1]))


            i = i + 1

    def didClick(self, pos, font):
        """
        Return a tuple e.g.(True, Card) or (False, None) that represents if the click at pos
        was on a card and which card it was.
        :param pos:
        :return:
        """
        handStart = (40, 180 - self.size)
        interval = 40

        for i in range(0, len(self.hand)):
            card = self.hand[i]
            # The top left position of this card
            pos = (handStart[0] + 40*i, handStart[1])

            # Rect the size of
            renderCard = card.render(font)
            crect = renderCard.get_rect()
            crect.left = pos[0]
            crect.top = pos[1]

            if (crect.collidepoint(pg.mouse.get_pos())):
                return (True, card, i)

        return (False, None, None)


class TrickPile:
    def __init__(self):
        self.pile = []

    def updateWithGamestate(self, gameState):
        """
        Update the trick pile based on the gamestate json object
        :param gameState:
        :return:
        """
        cardsPlayed = gameState["cards_played"]
        self.pile = []
        for cardString in cardsPlayed:
            card = Card(cardString)
            self.pile.append(card)


    def draw_pile(self, screen, font, size=20, center=(120, 90)):
        """
        Draws the pile in the middle of the screen.
        :param screen:
        :return:
        """
        size = size * 2
        gap = 60
        positions = [(center[0] - gap, center[1] - gap),
                     (center[0], center[1] - gap),
                     (center[0] - gap, center[1]),
                     (center[0], center[1]),
                     ]
        i = 0
        for card in self.pile:
            c = card.render(font)
            screen.blit(c, positions[i % 4])
            i = i + 1

class MessageDisplayer():
    def __init__(self, font, time=5, pos=(0,0)):
        self.font = font
        self.time = time
        self.startTime = 0
        self.pos = pos

        self.text = ""

    def displayMessage(self, msgstr):
        """
        Display message string to screen.
        :param msgstr:
        :param screen:
        :return:
        """
        self.text = msgstr
        self.startTime = time.time()

    def update(self, screen):
        if self.text != "":
            elapsedTime = time.time() - self.startTime
            # If time to show message is done then reset
            if (elapsedTime >= self.time):
                self.text = ""
            else:
                rend = self.font.render(self.text, False, (255, 255, 255))

                # Adds a nice fade out effect
                rend.set_alpha(255-((elapsedTime/self.time)*255))

                screen.blit(rend, self.pos)

class Hud():
    def __init__(self, pos=(200, 40)):
        self.pos = pos
        self.currentPlayer = 0
        self.followSuit = ""
        self.trumpSuit = ""


    def update(self, screen, font):
        rendPlayer = font.render("Player " + str(self.currentPlayer) + "'s turn", False, (255, 255, 255))
        screen.blit(rendPlayer, (self.pos[0], self.pos[1]))

        rendFollowSuit = font.render("Follow suit: " + self.followSuit, False, (255, 255, 255))
        screen.blit(rendFollowSuit, (self.pos[0], self.pos[1]+20))

        rendTrumpSuit = font.render("Trump suit: " + self.trumpSuit, False, (255, 255, 255))
        screen.blit(rendTrumpSuit, (self.pos[0], self.pos[1]+40))

    def updateWithGameState(self, gameState):
        self.currentPlayer = gameState["player_to_go"]
        self.followSuit = gameState["follow_suit"]
        self.trumpSuit = gameState["trump_suit"]


async def main():
    # initialize the pg module
    pg.init()
    pg.display.set_caption("Aces Seven")

    # create a surface on screen that has the size of 240 x 180
    screen = pg.display.set_mode((600, 600))

    # define a variable to control the main loop
    running = True

    font = pg.font.Font('res/menlo/Menlo/Menlo.ttc', 20)

    hand = UsersHand()
    pile = TrickPile()
    hud = Hud()
    messenger = MessageDisplayer(font)

    # Setup the game
    gameProcess = await asyncio.create_subprocess_exec("java", "-jar",
                                                       "../target/project-code-1.0-jar-with-dependencies.jar",
                                                       "../games/one_trick_pony.json", stdin=subprocess.PIPE,
                                                       stdout=subprocess.PIPE)
    gameout = gameProcess.stdout
    gamein = gameProcess.stdin
    jsonGen = stream_read_json2(gameout)

    message = await jsonGen.__anext__()
    if message["request_type"] == "sending_game_state":
        pile.updateWithGamestate(message["game_state"])
        hand.updateWithGameState(message["game_state"])
        hud.updateWithGameState(message["game_state"])
        messenger.displayMessage("Go Player " + str(message["game_state"]["player_to_go"]) + "!")

    currentReq = ""
    # If we are asked for card move to messages in a row then the last move must have been incorrect
    askedMoveLastTime = False


    # main loop
    while running:

        # event handling, gets all event from the event queue
        for event in pg.event.get():
            if event.type == pg.QUIT:
                # change the value to False, to exit the main loop
                running = False
            elif event.type == pg.MOUSEBUTTONUP:
                click, card, index = hand.didClick(event.pos, font)
                if click and currentReq == "card_move":
                    msg = {"value": index}

                    # Clear current request because we have dealt with it
                    currentReq = ""
                    print(">" + str(msg))
                    gamein.write(str(msg).encode())

        # Only get a message if its needed.
        if currentReq == "":
            req = await jsonGen.__anext__()
            currentReq = req["request_type"]
            if currentReq == "sending_game_state":
                pile.updateWithGamestate(req["game_state"])
                hand.updateWithGameState(req["game_state"])
                hud.updateWithGameState(req["game_state"])
                messenger.displayMessage("Go Player " + str(req["game_state"]["player_to_go"]) + "!")

                # Have dealt with message
                currentReq = ""
            elif currentReq == "send_trick_summary":

                messenger.displayMessage("Winning player is: " + req["winning_player"][-1] + " with " + req["points_totals"][int(req["winning_player"][-1])] + " Points")

        # Clear screen
        screen.fill((0, 0, 0))

        # Draw the users hand
        hand.update(screen, font)

        # Draw the pile in middle of screen
        pile.draw_pile(screen, font=font)

        # Display any messages
        messenger.update(screen)

        # Draw hud
        hud.update(screen, font)

        # Update the display
        pg.display.update()

if __name__ == '__main__':
    asyncio.run(main())

