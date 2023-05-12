package Development;

import UI.Demo.Controller.GameController;
import UI.Demo.Controller.GameSystem;
import Player.PlayerModel;

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
                PlayerModel playerModel1 = new PlayerModel();
                PlayerModel playerModel2 = new PlayerModel();
                GameSystem.join(playerModel1);
                GameSystem.join(playerModel2);
                GameSystem.setCurrentPlayer(playerModel2);
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
