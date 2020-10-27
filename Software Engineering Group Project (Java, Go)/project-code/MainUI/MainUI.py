import asyncio

import pygame
import subprocess
import os
import time
import sys
from UIOptions import *

from GameConnector import stream_read_json2

# positional details
centreHand = (WIDTH / 2, HEIGHT - 50)
raisedHand = (WIDTH / 2, HEIGHT - 80)

# set up asset paths
game_folder = os.path.dirname(__file__)

res_folder = os.path.join(game_folder, "res")
img_folder = os.path.join(res_folder, "img")
card_folder = os.path.join(img_folder, "cards")
font_folder = os.path.join(res_folder, "fonts")
music_folder = os.path.join(res_folder, "music")

# potentially add custom font data to this later
default_font = "Menlo.ttc"
casino_font = "casino.ttf"
bagnard_font = "BagnardSans.otf"
rye_font = "Rye-Regular.ttf"

raisedCard = False

# broad utility functions
def draw_text(surface, text, size, x, y, font_type, colour):
    # TODO: add font and colour choice later
    font = pygame.font.Font(os.path.join(font_folder, font_type), size)
    text_surface = font.render(text, True, colour)
    text_rect = text_surface.get_rect()
    text_rect.center = (x, y)
    surface.blit(text_surface, text_rect)


class Card(pygame.sprite.Sprite):
    # Card sprite
    def __init__(self, card_name):

        pygame.sprite.Sprite.__init__(self)

        self.name = card_name
        self.image = pygame.image.load(os.path.join(card_folder, card_name + ".png")).convert()
        # self.image.set_colorkey(RED)
        self.rect = self.image.get_rect()
        self.rect.midbottom = centreHand


        self.LiveCard = True

        self.start_x = 0
        self.start_y = 0

        self.pos_x = 0
        self.pos_y = 0

    def update(self):
        if self.LiveCard:
            if self.rect.collidepoint(pygame.mouse.get_pos()):
                self.rect.midbottom = (self.start_x, self.start_y - 30)
            elif not self.rect.collidepoint(pygame.mouse.get_pos()):
                self.rect.midbottom = (self.start_x, self.start_y)

        else:
            self.rect.midbottom = (self.start_x, self.start_y)

        self.pos_x = self.rect.x
        self.pos_y = self.rect.y


class Player_Hand:
    def __init__(self):
        self.hand = []
        self.hand_sprites = pygame.sprite.Group()
        self.hand_buffered = False

    def add_to_hand(self, card):
        self.hand.append(card)
        self.hand_sprites.add(card)

    def remove_from_hand(self, card):
        self.hand.remove(card)
        self.hand_sprites.remove(card)

    def buffer_hand(self, player_hand):
        i = 1.5
        for card in player_hand.hand:
            card.start_x = (i * 100)
            card.start_y = 800
            i += 1

        self.hand_buffered = True

    def update_with_game_state(self, game_state):
        """
        Updates the hand to show the current players hand from game state
        :param game_state:
        :return:
        """
        self.hand = []
        self.hand_sprites.empty()
        self.hand_buffered = False

        cards_names = game_state["cards_in_hand"]
        for card_name in cards_names:
            self.add_to_hand(Card(card_name))


class Table_Pile:
    def __init__(self):
        self.table_sprites = pygame.sprite.GroupSingle()

    def play_card(self, card):
        self.table_card = card
        self.table_card.LiveCard = False
        self.table_card.start_x = 400
        self.table_card.start_y = 400
        self.table_sprites.add(card)

    def update_with_game_state(self, game_state):
        """
        Updates the top card in the pile from gameState.
        :param game_state:
        :return:
        """
        played_cards = game_state["cards_played"]
        try:
            top_card = played_cards[len(played_cards)-1]
            top_card_instance = Card(top_card)
            self.play_card(top_card_instance)
        except:
            pass


class HUD:
    def __init__(self, pos=(600, 215)):
        self.pos = pos
        self.current_player = 0
        self.follow_suit = ""
        self.trump_suit = ""

    def draw(self, screen, font_type):

        font = pygame.font.Font(os.path.join(font_folder, font_type), 36)
        rend_player = font.render("Player " + str(self.current_player) + "'s turn", True, GOLD)
        screen.blit(rend_player, (self.pos[0], self.pos[1]))

        rend_follow_suit = font.render("Follow suit: " + self.follow_suit, True, GOLD)
        screen.blit(rend_follow_suit, (self.pos[0], self.pos[1]+40))

        rend_trump_suit = font.render("Trump suit: " + self.trump_suit, True, GOLD)
        screen.blit(rend_trump_suit, (self.pos[0], self.pos[1]+80))

        rend_player_points = font.render("Player " + str(self.current_player) + " has: " + str(self.player_points) + " points", True, GOLD)
        screen.blit(rend_player_points, (self.pos[0], self.pos[1] + 120))

    def update_with_game_state(self, game_state):
        self.current_player = game_state["player_to_go"]
        self.follow_suit = game_state["follow_suit"]
        self.trump_suit = game_state["trump_suit"]
        self.player_points = game_state["player_to_go_points"]


class Message_Displayer:
    def __init__(self, font_name, time=3, pos=(5,5)):
        self.font = pygame.font.Font(os.path.join(font_folder, font_name), 48)
        self.time = time
        self.startTime = 0
        self.pos = pos

        self.text = ""

    def display_message(self, msgstr):
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
                rend = self.font.render(self.text, False, GOLD)

                # Adds a nice fade out effect
                rend.set_alpha(255-((elapsedTime/self.time)*255))

                screen.blit(rend, self.pos)
    # TODO: test this once asyncio is set up - it may work with this


class Button:
    def __init__(self, surface, colour, active_colour, pos_x, pos_y, x_dem, y_dem,):
        self.surface = surface
        self.x_dem = x_dem
        self.y_dem = y_dem
        self.pos_x = pos_x
        self.pos_y = pos_y
        self.colour = colour
        self.active_colour = active_colour

    def draw_button(self):
        cur = pygame.mouse.get_pos()
        if self.pos_x + self.x_dem > cur[0] > self.pos_x and self.pos_y + self.y_dem > cur[1] > self.pos_y:
            pygame.draw.rect(self.surface, self.active_colour, (self.pos_x, self.pos_y, self.x_dem, self.y_dem))
        else:
            pygame.draw.rect(self.surface, self.colour, (self.pos_x, self.pos_y, self.x_dem, self.y_dem))

    def text_to_button(self, text, colour, size):
         draw_text(self.surface, text, size, (self.pos_x + (self.x_dem/2)), (self.pos_y + (self.y_dem/2)), casino_font, colour)


class Game:
    def __init__(self):
        # intialize window (and maybe sprites?)
        pygame.init()
        pygame.mixer.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption(GAME_TITLE)
        self.clock = pygame.time.Clock()
        self.player_hand = Player_Hand()
        self.table_pile = Table_Pile()
        self.message_displayer = Message_Displayer(casino_font)
        self.hud = HUD()


        self.running = True
        self.paused = False
        self.start_screen = True
        self.end_screen = False
        self.start_menu = False

        self.current_request = ""
        self.game_in_pipe = None

    async def new(self, game_name):
        self.deck_sprites = pygame.sprite.Group()

        self.instanceCards()

        await self.run(game_name)

    def instanceCards(self):
        # create card assets
        files = os.listdir(card_folder)
        for file in files:
            if file.split(".")[1].strip() == "png":
                self.deck_sprites.add(Card(file.split(".")[0]))

    def updateWithGameState(self, game_state):
        """
        Updates all the components of the game screen to display what it in the gameState.
        :param game_state: JSON object received from the game pipe.
        :return:
        """
        self.table_pile.update_with_game_state(game_state)
        self.player_hand.update_with_game_state(game_state)
        self.hud.update_with_game_state(game_state)
        self.message_displayer.display_message("Go Player " + str(game_state["player_to_go"]) + "!")

    async def run(self, game_name):
        # game loop
        self.playing = True
        winner = ""

        folder_front = "../games/"
        game_location = folder_front + game_name

        # Setup the game process
        gameProcess = await asyncio.create_subprocess_exec("java", "-jar",
                                                           "../target/project-code-1.0-jar-with-dependencies.jar",
                                                           "-f", game_location, stdin=subprocess.PIPE,
                                                           stdout=subprocess.PIPE)
        gameOutPipe = gameProcess.stdout
        self.game_in_pipe = gameProcess.stdin
        jsonGen = stream_read_json2(gameOutPipe)

        # The first message from the game should always be game state
        message = await jsonGen.__anext__()
        if message["request_type"] == "sending_game_state":
            self.updateWithGameState(message["game_state"])

        # Stores the current request from game
        self.current_request = ""

        while self.playing:
            self.clock.tick(FPS)
            self.events()
            self.update()
            self.draw()

            # Get a request from the game
            if self.current_request == "":
                request_body = await jsonGen.__anext__()

                self.current_request = request_body["request_type"]
                if self.current_request == "sending_game_state":
                    self.updateWithGameState(request_body["game_state"])
                    self.current_request = ""
                elif self.current_request == "send_trick_summary":
                    print("made it")
                    self.current_request = ""
                elif self.current_request == "session_winners":
                    print("hell yeah brother")
                    winner_array = request_body["data"]
                    winner_dirty = winner_array[0]
                    winner = winner_dirty[15:]
                    self.playing = False
                elif self.current_request == "bid_value":
                    self.message_displayer.display_message("Enter bid value!")
                    # Needs to return ("value":"x"} where x is a number from the player
                    pass
                elif self.current_request == "bid_trump":
                    # Needs to return ("value":"x"} where x is a number from the player represnting suit
                    bid_menu = True

                    while bid_menu:
                        self.clock.tick()

                        cur = pygame.mouse.get_pos()

                        spades_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 600, HEIGHT/2, 200, 100)
                        hearts_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 350, HEIGHT/2, 200, 100)
                        clubs_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 50, HEIGHT/2, 200, 100)
                        diamonds_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 250, HEIGHT/2, 200, 100)
                        none_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 500, HEIGHT/2, 200, 100)

                        spades_button.draw_button()
                        hearts_button.draw_button()
                        clubs_button.draw_button()
                        diamonds_button.draw_button()
                        none_button.draw_button()

                        spades_button.text_to_button("Spades", BLACK, 48)
                        hearts_button.text_to_button("Hearts", BLACK, 48)
                        clubs_button.text_to_button("Clubs", BLACK, 48)
                        diamonds_button.text_to_button("Diamonds", BLACK, 36)
                        none_button.text_to_button("None", BLACK, 48)

                        pygame.display.update()

                        for event in pygame.event.get():
                            if event.type == pygame.QUIT:
                                self.running = False
                                bid_menu = False
                            if spades_button.pos_x + spades_button.x_dem > cur[0] > spades_button.pos_x and spades_button.pos_y + spades_button.y_dem > cur[1] > spades_button.pos_y:
                                if event.type == pygame.MOUSEBUTTONUP:
                                    msg = {"value": "1"}
                                    self.current_request = ""
                                    print(">" + str(msg))
                                    self.game_in_pipe.write(str(msg).encode())
                                    bid_menu = False
                            if hearts_button.pos_x + hearts_button.x_dem > cur[0] > hearts_button.pos_x and hearts_button.pos_y + hearts_button.y_dem > cur[1] > hearts_button.pos_y:
                                if event.type == pygame.MOUSEBUTTONUP:
                                    msg = {"value": "2"}
                                    self.current_request = ""
                                    print(">" + str(msg))
                                    self.game_in_pipe.write(str(msg).encode())
                                    bid_menu = False
                            if clubs_button.pos_x + clubs_button.x_dem > cur[0] > clubs_button.pos_x and clubs_button.pos_y + clubs_button.y_dem > cur[1] > clubs_button.pos_y:
                                if event.type == pygame.MOUSEBUTTONUP:
                                    msg = {"value": "4"}
                                    self.current_request = ""
                                    print(">" + str(msg))
                                    self.game_in_pipe.write(str(msg).encode())
                                    bid_menu = False
                            if diamonds_button.pos_x + diamonds_button.x_dem > cur[0] > diamonds_button.pos_x and diamonds_button.pos_y + diamonds_button.y_dem > cur[1] > diamonds_button.pos_y:
                                if event.type == pygame.MOUSEBUTTONUP:
                                    msg = {"value": "3"}
                                    self.current_request = ""
                                    print(">" + str(msg))
                                    self.game_in_pipe.write(str(msg).encode())
                                    bid_menu = False
                            if none_button.pos_x + none_button.x_dem > cur[0] > none_button.pos_x and none_button.pos_y + none_button.y_dem > cur[1] > none_button.pos_y:
                                if event.type == pygame.MOUSEBUTTONUP:
                                    msg = {"value": "0"}
                                    self.current_request = ""
                                    print(">" + str(msg))
                                    self.game_in_pipe.write(str(msg).encode())
                                    bid_menu = False

                elif self.current_request == "bid_choice":
                    bid_menu = True

                    while bid_menu:
                        self.clock.tick()

                        cur = pygame.mouse.get_pos()

                        pass_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2, HEIGHT/2, 200, 100)
                        double_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 250, HEIGHT/2, 200, 100)
                        other_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 250, HEIGHT/2, 200, 100)

                        pass_button.draw_button()
                        double_button.draw_button()
                        other_button.draw_button()

                        pass_button.text_to_button("Pass", BLACK, 48)
                        double_button.text_to_button("Double", BLACK, 36)
                        other_button.text_to_button("...", BLACK, 48)

                        pygame.display.update()

                        for event in pygame.event.get():
                            if event.type == pygame.QUIT:
                                self.running = False
                                bid_menu = False
                            if pass_button.pos_x + pass_button.x_dem > cur[0] > pass_button.pos_x and pass_button.pos_y + pass_button.y_dem > cur[1] > pass_button.pos_y:
                                if event.type == pygame.MOUSEBUTTONUP:
                                    msg = {"value": "Pass"}
                                    self.current_request = ""
                                    print(">" + str(msg))
                                    self.game_in_pipe.write(str(msg).encode())
                                    bid_menu = False
                            if double_button.pos_x + double_button.x_dem > cur[0] > double_button.pos_x and double_button.pos_y + double_button.y_dem > cur[1] > double_button.pos_y:
                                if event.type == pygame.MOUSEBUTTONUP:
                                    msg = {"value": "Double"}
                                    self.current_request = ""
                                    print(">" + str(msg))
                                    self.game_in_pipe.write(str(msg).encode())
                                    bid_menu = False
                            if other_button.pos_x + other_button.x_dem > cur[0] > other_button.pos_x and other_button.pos_y + other_button.y_dem > cur[1] > other_button.pos_y:
                                if event.type == pygame.MOUSEBUTTONUP:
                                    msg = {"value": ""}
                                    self.current_request = ""
                                    print(">" + str(msg))
                                    self.game_in_pipe.write(str(msg).encode())
                                    bid_menu = False



        self.show_end_screen(winner)

    def events(self):
        # Process input (events)
        cur = pygame.mouse.get_pos()

        for event in pygame.event.get():
            # check for window close
            if event.type == pygame.QUIT:
                if self.playing:
                    self.playing = False
                self.running = False
            card_index = 0
            for card in self.player_hand.hand:
                if card.pos_x + card.rect.width > cur[0] > card.pos_x and card.pos_y + card.rect.height > cur[1] > card.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP and self.current_request == "card_move":
                        # self.table_pile.play_card(card)
                        # self.player_hand.remove_from_hand(card)

                        msg = {"value": card_index}

                        # Clear current request because we have dealt with it
                        self.current_request = ""
                        print(">" + str(msg))
                        self.game_in_pipe.write(str(msg).encode())

                card_index = card_index + 1

            if event.type == pygame.KEYDOWN and self.current_request == "bid_value":
                if event.key == pygame.K_0:
                    text = "0"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_1:
                    text = "1"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_2:
                    text = "2"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_3:
                    text = "3"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_4:
                    text = "4"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_5:
                    text = "5"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_6:
                    text = "6"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_7:
                    text = "7"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_8:
                    text = "8"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())
                if event.key == pygame.K_9:
                    text = "9"
                    msg = {"value": text}
                    self.current_request = ""
                    print(">" + str(msg))
                    self.game_in_pipe.write(str(msg).encode())

    def update(self):
        # update buffer from inputs
        self.deck_sprites.update()
        self.player_hand.hand_sprites.update()
        self.table_pile.table_sprites.update()

    def draw(self):
        # draw from buffer
        # self.screen.fill(D_GREEN)
        bg = pygame.image.load(os.path.join(img_folder, "rsz_36.jpg"))
        self.screen.blit(bg, (0,0))
        if not self.player_hand.hand_buffered:
            self.player_hand.buffer_hand(self.player_hand)
        self.player_hand.hand_sprites.draw(self.screen)
        self.table_pile.table_sprites.draw(self.screen)

        self.hud.draw(self.screen, rye_font)
        self.message_displayer.update(self.screen)

        pygame.display.update()

    async def show_start_menu(self):
        self.start_menu = True
        game_name = "one_trick_pony.json"
        while self.start_menu:
            self.clock.tick()
            self.screen.fill(D_GREEN)

            cur = pygame.mouse.get_pos()

            A7_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 250, HEIGHT/2, 200, 100)
            SG_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 50, HEIGHT/2, 200, 100)

            draw_text(self.screen, "Choose your game category:", 80, WIDTH/2, HEIGHT/4 - 100, rye_font, BLACK)

            draw_text(self.screen, "Ace's Seven Games", 24, WIDTH/2 - 150, HEIGHT/2 + 116, rye_font, BLACK)
            draw_text(self.screen, "Super Group Games", 24, WIDTH/2 + 150, HEIGHT/2 + 116, rye_font, BLACK)

            A7_button.draw_button()
            SG_button.draw_button()

            A7_button.text_to_button("A7", BLACK, 48)
            SG_button.text_to_button("SG", BLACK, 48)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                    self.start_screen = False
                if A7_button.pos_x + A7_button.x_dem > cur[0] > A7_button.pos_x and A7_button.pos_y + A7_button.y_dem > cur[1] > A7_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        self.start_menu = False
                        game_name = "A7 Game Store/" + await self.show_A7_menu()
                if SG_button.pos_x + SG_button.x_dem > cur[0] > SG_button.pos_x and SG_button.pos_y + SG_button.y_dem > cur[1] > SG_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        self.start_menu = False
                        game_name = "SG Game Store/" + await self.show_SG_menu()

        if self.running:
            return game_name


    async def show_start_screen(self):
        # start screen for game
        pygame.mixer.music.load(os.path.join(music_folder, "game_music.ogg"))
        pygame.mixer.music.play(-1, 0.0)
        game_name = ""

        while self.start_screen:
            self.clock.tick(FPS)

            cur = pygame.mouse.get_pos()
            logo = pygame.image.load(os.path.join(img_folder, "aces7logo.png"))

            start_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 100, HEIGHT/2 + 200, 200, 100)
            bg = pygame.image.load(os.path.join(img_folder, "rsz_start_screen_bg.jpg"))
            self.screen.blit(bg, (0, 0))

            self.screen.blit(logo, (WIDTH/2 - 150, HEIGHT/4 - 80))

            draw_text(self.screen, "Welcome to...", 96, WIDTH/2, HEIGHT/4 - 150, casino_font, BLACK)

            draw_text(self.screen, "Press start to begin", 44, WIDTH/2, HEIGHT/2 + 170, casino_font, BLACK)
            start_button.draw_button()
            start_button.text_to_button("Start", BLACK, 48)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                    self.start_screen = False
                if start_button.pos_x + start_button.x_dem > cur[0] > start_button.pos_x and start_button.pos_y + start_button.y_dem > cur[1] > start_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        self.start_screen = False
                        game_name = await self.show_start_menu()

        if self.running:
            await self.new(game_name)

    def show_pause_screen(self):
        pass

    def show_end_screen(self, winner):
        self.end_screen = True
        start_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 100, HEIGHT/2 + 200, 200, 100)

        # draw
        while self.end_screen:
            cur = pygame.mouse.get_pos()
            bg = pygame.image.load(os.path.join(img_folder, "rsz_end_screen_bg.jpg"))

            self.screen.blit(bg, (0, 0))
            draw_text(self.screen, "CONGRATULATIONS!", 104, WIDTH/2, HEIGHT/4 - 100, rye_font, BLACK)
            draw_text(self.screen, winner, 88, WIDTH/2, (HEIGHT/4 + 8), rye_font, BLACK)
            draw_text(self.screen, "IS THE WINNER!", 104, WIDTH/2, (HEIGHT/4 + 122), rye_font, GOLD)

            start_button.draw_button()
            start_button.text_to_button("Play Again?", BLACK, 48)

            # update
            pygame.display.update()

            # events
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                    self.start_screen = False
                if start_button.pos_x + start_button.x_dem > cur[0] > start_button.pos_x and start_button.pos_y + start_button.y_dem > cur[1] > start_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        self.end_screen = False
                        self.start_screen = True
                        self.show_start_screen()

    async def show_A7_menu(self):
        self.start_menu = True
        while self.start_menu:
            self.clock.tick()
            self.screen.fill(NAVY)

            cur = pygame.mouse.get_pos()

            no_pass_hearts_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 250, HEIGHT/2 - 200, 200, 100)
            one_trick_pony_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 50, HEIGHT/2 - 200, 200, 100)
            speed_golf_whist_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 250, HEIGHT/2, 200, 100)
            two_player_whist_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 50, HEIGHT/2, 200, 100)
            whist_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 100, HEIGHT/2 + 200, 200, 100)

            draw_text(self.screen, "Choose your game:", 80, WIDTH/2, HEIGHT/4 - 100, rye_font, BLACK)

            no_pass_hearts_button.draw_button()
            one_trick_pony_button.draw_button()
            speed_golf_whist_button.draw_button()
            two_player_whist_button.draw_button()
            whist_button.draw_button()

            no_pass_hearts_button.text_to_button("No-Pass Hearts", BLACK, 24)
            one_trick_pony_button.text_to_button("One Trick Pony", BLACK, 24)
            speed_golf_whist_button.text_to_button("Speed Golf Whist", BLACK, 22)
            two_player_whist_button.text_to_button("Two Player Whist", BLACK, 22)
            whist_button.text_to_button("Whist", BLACK, 30)

            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                    self.start_screen = False
                if no_pass_hearts_button.pos_x + no_pass_hearts_button.x_dem > cur[0] > no_pass_hearts_button.pos_x and no_pass_hearts_button.pos_y + no_pass_hearts_button.y_dem > cur[1] > no_pass_hearts_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        game_name = "no_pass_hearts.json"
                        self.start_menu = False
                if one_trick_pony_button.pos_x + one_trick_pony_button.x_dem > cur[0] > one_trick_pony_button.pos_x and one_trick_pony_button.pos_y + one_trick_pony_button.y_dem > cur[1] > one_trick_pony_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        game_name = "one_trick_pony.json"
                        self.start_menu = False
                if speed_golf_whist_button.pos_x + speed_golf_whist_button.x_dem > cur[0] > speed_golf_whist_button.pos_x and speed_golf_whist_button.pos_y + speed_golf_whist_button.y_dem > cur[1] > speed_golf_whist_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        game_name = "speed_golf_whist.json"
                        self.start_menu = False
                if two_player_whist_button.pos_x + two_player_whist_button.x_dem > cur[0] > two_player_whist_button.pos_x and two_player_whist_button.pos_y + two_player_whist_button.y_dem > cur[1] > two_player_whist_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        game_name = "two_player_whist.json"
                        self.start_menu = False
                if whist_button.pos_x + whist_button.x_dem > cur[0] > whist_button.pos_x and whist_button.pos_y + whist_button.y_dem > cur[1] > whist_button.pos_y:
                    if event.type == pygame.MOUSEBUTTONUP:
                        game_name = "whist.json"
                        self.start_menu = False

        if self.running:
            return game_name

    async def show_SG_menu(self):
        self.start_menu = True
        game_name = ""
        print("SG Active")
        while self.start_menu:
                self.clock.tick()
                self.screen.fill(NAVY)

                cur = pygame.mouse.get_pos()

                bridge_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 100, HEIGHT - 650, 200, 100)
                catch_the_ten_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 150, HEIGHT - 650, 200, 100)
                clubs_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 350, HEIGHT - 650, 200, 100)
                contract_whist_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 100, HEIGHT - 500, 200, 100)
                jabberwocky_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 150, HEIGHT - 500, 200, 100)
                oh_hell_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 350, HEIGHT - 500, 200, 100)
                one_trick_pony_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 100, HEIGHT - 350, 200, 100)
                reverse_spades_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 150, HEIGHT - 350, 200, 100)
                simplified_napoleon_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 350, HEIGHT - 350, 200, 100)
                smart_aleck_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 100, HEIGHT - 200, 200, 100)
                spade_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 + 150, HEIGHT - 200, 200, 100)
                two_trick_pony_button = Button(self.screen, WHITE, L_BLUE, WIDTH/2 - 350, HEIGHT - 200, 200, 100)

                draw_text(self.screen, "Choose your game:", 80, WIDTH/2, HEIGHT/4 - 100, rye_font, BLACK)

                bridge_button.draw_button()
                catch_the_ten_button.draw_button()
                clubs_button.draw_button()
                contract_whist_button.draw_button()
                jabberwocky_button.draw_button()
                oh_hell_button.draw_button()
                one_trick_pony_button.draw_button()
                reverse_spades_button.draw_button()
                simplified_napoleon_button.draw_button()
                smart_aleck_button.draw_button()
                spade_button.draw_button()
                two_trick_pony_button.draw_button()

                bridge_button.text_to_button("Bridge", BLACK, 30)
                catch_the_ten_button.text_to_button("Catch The Ten", BLACK, 24)
                clubs_button.text_to_button("Clubs", BLACK, 30)
                contract_whist_button.text_to_button("Contract Whist", BLACK, 24)
                jabberwocky_button.text_to_button("Jabberwocky", BLACK, 24)
                oh_hell_button.text_to_button("Oh Hell!", BLACK, 30)
                one_trick_pony_button.text_to_button("One Trick Pony", BLACK, 22)
                reverse_spades_button.text_to_button("Reverse Spades", BLACK, 22)
                simplified_napoleon_button.text_to_button("Simplified Napoleon", BLACK, 20)
                smart_aleck_button.text_to_button("Smart Aleck", BLACK, 24)
                spade_button.text_to_button("Spade Button", BLACK, 24)
                two_trick_pony_button.text_to_button("Two Trick Pony", BLACK, 22)

                pygame.display.update()

                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        self.running = False
                        self.start_screen = False
                    if bridge_button.pos_x + bridge_button.x_dem > cur[0] > bridge_button.pos_x and bridge_button.pos_y + bridge_button.y_dem > cur[1] > bridge_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "bridge.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                    if catch_the_ten_button.pos_x + catch_the_ten_button.x_dem > cur[0] > catch_the_ten_button.pos_x and catch_the_ten_button.pos_y + catch_the_ten_button.y_dem > cur[1] > catch_the_ten_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "catchtheten.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                    if clubs_button.pos_x + clubs_button.x_dem > cur[0] > clubs_button.pos_x and clubs_button.pos_y + clubs_button.y_dem > cur[1] > clubs_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "clubs.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                    if contract_whist_button.pos_x + contract_whist_button.x_dem > cur[0] > contract_whist_button.pos_x and contract_whist_button.pos_y + contract_whist_button.y_dem > cur[1] > contract_whist_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "contractWhist.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                    if jabberwocky_button.pos_x + jabberwocky_button.x_dem > cur[0] > jabberwocky_button.pos_x and jabberwocky_button.pos_y + jabberwocky_button.y_dem > cur[1] > jabberwocky_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "jabberwocky.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                    if oh_hell_button.pos_x + oh_hell_button.x_dem > cur[0] > oh_hell_button.pos_x and oh_hell_button.pos_y + oh_hell_button.y_dem > cur[1] > oh_hell_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "ohhell.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                    if one_trick_pony_button.pos_x + one_trick_pony_button.x_dem > cur[0] > one_trick_pony_button.pos_x and one_trick_pony_button.pos_y + one_trick_pony_button.y_dem > cur[1] > one_trick_pony_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "one-trick-pony.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                    if reverse_spades_button.pos_x + reverse_spades_button.x_dem > cur[0] > reverse_spades_button.pos_x and reverse_spades_button.pos_y + reverse_spades_button.y_dem > cur[1] > reverse_spades_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "reverse-spades.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                    if simplified_napoleon_button.pos_x + simplified_napoleon_button.x_dem > cur[0] > simplified_napoleon_button.pos_x and simplified_napoleon_button.pos_y + simplified_napoleon_button.y_dem > cur[1] > simplified_napoleon_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "simplified-napoleon.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                        def wait_for_key(self):
                            waiting = True
                            while waiting:
                                self.clock.tick(FPS)
                                for event in pygame.event.get():
                                    if event.type == pygame.QUIT:
                                        waiting = False
                                        self.running = False
                                    if event.type == pygame.KEYUP:
                                        waiting = False
                    if smart_aleck_button.pos_x + smart_aleck_button.x_dem > cur[0] > smart_aleck_button.pos_x and smart_aleck_button.pos_y + smart_aleck_button.y_dem > cur[1] > smart_aleck_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "smart-aleck.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                        def wait_for_key(self):
                            waiting = True
                            while waiting:
                                self.clock.tick(FPS)
                                for event in pygame.event.get():
                                    if event.type == pygame.QUIT:
                                        waiting = False
                                        self.running = False
                                    if event.type == pygame.KEYUP:
                                        waiting = False
                    if spade_button.pos_x + spade_button.x_dem > cur[0] > spade_button.pos_x and spade_button.pos_y + spade_button.y_dem > cur[1] > spade_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "spades.json"
                            self.start_menu = False

                            if self.running:
                                return game_name
                        def wait_for_key(self):
                            waiting = True
                            while waiting:
                                self.clock.tick(FPS)
                                for event in pygame.event.get():
                                    if event.type == pygame.QUIT:
                                        waiting = False
                                        self.running = False
                                    if event.type == pygame.KEYUP:
                                        waiting = False
                    if two_trick_pony_button.pos_x + two_trick_pony_button.x_dem > cur[0] > two_trick_pony_button.pos_x and two_trick_pony_button.pos_y + two_trick_pony_button.y_dem > cur[1] > two_trick_pony_button.pos_y:
                        if event.type == pygame.MOUSEBUTTONUP:
                            game_name = "two-trick-pony.json"
                            self.start_menu = False

                            if self.running:
                                return game_name

    def wait_for_key(self):
                            waiting = True
                            while waiting:
                                self.clock.tick(FPS)
                                for event in pygame.event.get():
                                    if event.type == pygame.QUIT:
                                        waiting = False
                                        self.running = False
                                    if event.type == pygame.KEYUP:
                                        waiting = False

async def main():
    g = Game()
    while g.running:
        await g.show_start_screen()

    pygame.display.quit()
    pygame.quit()

if __name__ == '__main__':
    asyncio.run(main())



