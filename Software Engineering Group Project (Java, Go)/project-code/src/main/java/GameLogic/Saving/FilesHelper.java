package GameLogic.Saving;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Path;

/**
 * Used to replace Files.readString as it is not in lab machine version of java.
 */
public class FilesHelper {
	
	/**
	 * Reads all characters from a file into a string, decoding from bytes to characters using the specified charset.
	 * The method ensures that the file is closed when all content have been read or an I/O error, or other runtime
	 * exception, is thrown.
	 * This method reads all content including the line separators in the middle and/or at the end. The resulting string
	 * will contain line separators as they appear in the file.
	 * @param path the path to the file
	 * @param cs the charset to use for decoding
	 * @return a String containing the content read from the file
	 */
	public static String readString(Path path, Charset cs) throws IOException {
		File f = path.toFile();
		
		BufferedReader r = new BufferedReader(new FileReader(f));
		
		StringBuilder str = new StringBuilder();
		
		String line = "";
		while ((line = r.readLine()) != null) {
			str.append(line);
		}
		
		return str.toString();
	}
}
