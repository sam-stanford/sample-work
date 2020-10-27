
import GameLogic.Core.GameParser;
import org.junit.*;

import java.io.IOException;

public class GameParserTests {

    GameParser g1;
    GameParser g2;
    GameParser g3;
    GameParser g4;


    @Test (expected = IOException.class)
    public void testConstruction() throws IOException {
        //normal
        g1 = new GameParser("src/../games/A7 Game Store/whist.json");
        Assert.assertNotNull(g1);

        // null
        Assert.assertNull(g2);

        //file not found
        g3 = new GameParser("src/../games/A7 Game Store/speed.json");
    }

    @Test (expected = NullPointerException.class)
    public void testConstructionPart2() throws IOException {

        g4 = new GameParser(null);
    }


}
