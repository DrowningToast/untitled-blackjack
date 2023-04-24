package Development;

import UI.Demo.Controller.DemoDisplayController;
import UI.Demo.Display.DemoDisplay;

import java.util.Scanner;

public class DemoDisplayTest {
    public static void main(String[] args) {
        DemoDisplay UI = new DemoDisplay();
        DemoDisplayController controller = new DemoDisplayController(UI);
        controller.setDisplayName("Hi, Supratouch");

        Scanner scanner = new Scanner(System.in);
        scanner.next();
    }
}
