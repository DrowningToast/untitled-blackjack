package Development;

import UI.Demo.Controller.GameController;
import UI.Demo.Controller.GameSystem;
import UI.Demo.Model.Player;

public class TestGame {

    public static void main(String args[]) {
//        /* Set the Nimbus look and feel */
//        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
//        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
//         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
//         */
//        try {
//            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
//                if ("Nimbus".equals(info.getName())) {
//                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
//                    break;
//                }
//            }
//        } catch (ClassNotFoundException ex) {
//            java.util.logging.Logger.getLogger(GamePlayDisplayGUI.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (InstantiationException ex) {
//            java.util.logging.Logger.getLogger(GamePlayDisplayGUI.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (IllegalAccessException ex) {
//            java.util.logging.Logger.getLogger(GamePlayDisplayGUI.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
//            java.util.logging.Logger.getLogger(GamePlayDisplayGUI.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        }
//        //</editor-fold>
//        //</editor-fold>
//        
//        /* Create and display the form */
//        System.out.println("main test");
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                Player player1 = new Player();
                Player player2 = new Player();
                GameSystem.join(player1);
                GameSystem.join(player2);
                GameSystem.setCurrentPlayer(player2);
                GameController control = new GameController();
                control.startGame();
//                control.callGame();
//                LoginDisplayGUI loginGui = new LoginDisplayGUI();
//                loginGui.init();
//                    LobbyDisplayGUI lobbyGUI = new LobbyDisplayGUI();
//                    lobbyGUI.init();
//                 GamePlayDisplayGUI gameGui = new GamePlayDisplayGUI();
//                 gameGui.init();
            }
        });
        
    }
}
