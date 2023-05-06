
package UI.Demo.Display;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import UI.Demo.Controller.GameController;


public class LobbyDisplayGUI extends javax.swing.JFrame {

    public LobbyDisplayGUI() {
        initComponents();
    }


    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        LobbyPanel = new javax.swing.JPanel();
        gameTitle = new javax.swing.JLabel();
        b_createLobby = new javax.swing.JButton();
        b_joinLobby = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setMinimumSize(new java.awt.Dimension(1280, 800));

        LobbyPanel.setBackground(new java.awt.Color(0, 102, 102));
        LobbyPanel.setBorder(javax.swing.BorderFactory.createMatteBorder(5, 5, 5, 5, new java.awt.Color(255, 204, 0)));
        LobbyPanel.setMaximumSize(new java.awt.Dimension(1280, 800));
        LobbyPanel.setMinimumSize(new java.awt.Dimension(1280, 800));
        LobbyPanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        gameTitle.setFont(new java.awt.Font("Book Antiqua", 1, 100)); // NOI18N
        gameTitle.setForeground(new java.awt.Color(255, 204, 0));
        gameTitle.setText("Untitled-BlackJack");
        LobbyPanel.add(gameTitle, new org.netbeans.lib.awtextra.AbsoluteConstraints(227, 229, 873, 114));

        b_createLobby.setBackground(new java.awt.Color(255, 204, 0));
        b_createLobby.setFont(new java.awt.Font("Book Antiqua", 1, 30)); // NOI18N
        b_createLobby.setForeground(new java.awt.Color(153, 102, 0));
        b_createLobby.setText("Create Lobby");
        b_createLobby.setMaximumSize(new java.awt.Dimension(400, 50));
        b_createLobby.setMinimumSize(new java.awt.Dimension(400, 50));
        b_createLobby.setPreferredSize(new java.awt.Dimension(400, 50));
        b_createLobby.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                b_createLobbyActionPerformed(evt);
            }
        });
        LobbyPanel.add(b_createLobby, new org.netbeans.lib.awtextra.AbsoluteConstraints(440, 410, -1, -1));

        b_joinLobby.setBackground(new java.awt.Color(153, 102, 0));
        b_joinLobby.setFont(new java.awt.Font("Book Antiqua", 1, 30)); // NOI18N
        b_joinLobby.setForeground(new java.awt.Color(255, 204, 0));
        b_joinLobby.setText("Join Lobby");
        b_joinLobby.setMaximumSize(new java.awt.Dimension(400, 50));
        b_joinLobby.setMinimumSize(new java.awt.Dimension(400, 50));
        b_joinLobby.setPreferredSize(new java.awt.Dimension(400, 50));
        LobbyPanel.add(b_joinLobby, new org.netbeans.lib.awtextra.AbsoluteConstraints(440, 500, -1, -1));

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(LobbyPanel, javax.swing.GroupLayout.PREFERRED_SIZE, 1280, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(LobbyPanel, javax.swing.GroupLayout.PREFERRED_SIZE, 800, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void b_createLobbyActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_b_createLobbyActionPerformed
//        this.dispose();
//        GameController ml = new GameController();
//        ml.callGame();
    }//GEN-LAST:event_b_createLobbyActionPerformed

    public void init(){
        initComponents();
        this.setExtendedState(this.MAXIMIZED_BOTH);
        this.setVisible(true);
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JPanel LobbyPanel;
    private javax.swing.JButton b_createLobby;
    private javax.swing.JButton b_joinLobby;
    private javax.swing.JLabel gameTitle;
    // End of variables declaration//GEN-END:variables

    public JPanel getLobbyPanel() {
        return LobbyPanel;
    }

    public void setLobbyPanel(JPanel LobbyPanel) {
        this.LobbyPanel = LobbyPanel;
    }

    public JButton getB_createLobby() {
        return b_createLobby;
    }

    public void setB_createLobby(JButton b_createLobby) {
        this.b_createLobby = b_createLobby;
    }

    public JButton getB_joinLobby() {
        return b_joinLobby;
    }

    public void setB_joinLobby(JButton b_joinLobby) {
        this.b_joinLobby = b_joinLobby;
    }

    public JLabel getGameTitle() {
        return gameTitle;
    }

    public void setGameTitle(JLabel gameTitle) {
        this.gameTitle = gameTitle;
    }

}
