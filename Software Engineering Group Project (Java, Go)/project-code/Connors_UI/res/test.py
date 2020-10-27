import asyncio
import threading
import pygame

async def gen():
    i = 0
    while True:
        await asyncio.sleep(3)
        yield i
        i = i + 1


class batch():
    def __init__(self):
        self.one_batch = []

    async def sub(self):
        async for x in gen():
            self.one_batch.append(x)

    async def run(self):
        while True:
            await asyncio.sleep(1)
            print(len(self.one_batch))


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    b = batch()

    loop.create_task(b.sub())
    loop.create_task(b.run())

    loop.run_forever()
    loop.close()

