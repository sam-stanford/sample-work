import asyncio
import json
from json import JSONDecodeError
import sys
import subprocess


async def stream_read_json2(gameout):
    """
    Reads and yields a json a line at a time from stdin
    :return:
    """
    while True:
        line = await gameout.readline()
        if line.strip() != "":
            try:
                js = json._default_decoder.decode(line.decode())
                print("< " + str(js))
                yield js
            except JSONDecodeError:
                pass
        else:
            yield {}



async def stream_read_json():
    """
    Reads a json from a stream assuming always terminated by newline.
    :param f:
    :return:
    """
    f = sys.stdin

    # Use this as a buffer to process JSONs over multiple lines.
    strbuf = ""
    useBuffer = False
    for line in f:
        try:
            if useBuffer:

                # Try to decode with strbuf
                strbuf = strbuf + line.strip()
                obj = json._default_decoder.decode(strbuf)

                # Clear buffer and yield if successful
                strbuf = ""
                useBuffer = False
                yield obj
            else:
                obj = json._default_decoder.decode(line.strip())
                yield obj
        except JSONDecodeError as e:
            if not useBuffer:
                strbuf = strbuf + line.strip()
                useBuffer = True

if __name__ == '__main__':
    gen = stream_read_json2()
    for x in range(0, 10):
        print(next(gen))