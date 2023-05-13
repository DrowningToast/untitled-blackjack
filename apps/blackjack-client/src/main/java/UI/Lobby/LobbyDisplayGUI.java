
package UI.Lobby;

import Main.MainRunner;
import UI.Controller.CustomFrame;

import javax.swing.*;


public class LobbyDisplayGUI extends CustomFrame {

    private LobbyController controller;

    public LobbyDisplayGUI(LobbyController controller) {
        this.controller = controller;
        initComponents();
    }


    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        LobbyPanel = new javax.swing.JPanel();
        gameTitle = new javax.swing.JLabel();
        b_createLobby = new javax.swing.JButton();
        b_joinLobby = new javax.swing.JButton();
        passCode = new javax.swing.JTextField();
        jLabel1 = new javax.swing.JLabel();

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
        LobbyPanel.add(gameTitle, new org.netbeans.lib.awtextra.AbsoluteConstraints(190, 180, 910, 114));

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
        LobbyPanel.add(b_createLobby, new org.netbeans.lib.awtextra.AbsoluteConstraints(440, 430, -1, -1));

        b_joinLobby.setBackground(new java.awt.Color(153, 102, 0));
        b_joinLobby.setFont(new java.awt.Font("Book Antiqua", 1, 30)); // NOI18N
        b_joinLobby.setForeground(new java.awt.Color(255, 204, 0));
        b_joinLobby.setText("Join Lobby");
        b_joinLobby.setMaximumSize(new java.awt.Dimension(400, 50));
        b_joinLobby.setMinimumSize(new java.awt.Dimension(400, 50));
        b_joinLobby.setPreferredSize(new java.awt.Dimension(400, 50));
        b_joinLobby.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                b_joinLobbyActionPerformed(evt);
            }
        });
        LobbyPanel.add(b_joinLobby, new org.netbeans.lib.awtextra.AbsoluteConstraints(440, 500, -1, -1));

        passCode.setBackground(new java.awt.Color(51, 51, 51));
        passCode.setFont(new java.awt.Font("Book Antiqua", 1, 18)); // NOI18N
        passCode.setForeground(new java.awt.Color(204, 204, 204));
        passCode.setMaximumSize(new java.awt.Dimension(400, 50));
        passCode.setMinimumSize(new java.awt.Dimension(400, 50));
        passCode.setPreferredSize(new java.awt.Dimension(400, 50));
        passCode.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                passCodeActionPerformed(evt);
            }
        });
        LobbyPanel.add(passCode, new org.netbeans.lib.awtextra.AbsoluteConstraints(440, 360, 400, 50));


        jLabel1.setFont(new java.awt.Font("Leelawadee UI", 1, 20)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(255, 255, 255));
        jLabel1.setText("Enter Passcode");
        LobbyPanel.add(jLabel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 310, -1, -1));


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
        // call handler
        controller.handleRoomCreated(passCode.getText());
    }//GEN-LAST:event_b_createLobbyActionPerformed

    private void b_joinLobbyActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_b_joinLobbyActionPerformed
        // JOIN LOBBY
        controller.handleJoinRoom(passCode.getText());
    }//GEN-LAST:event_b_joinLobbyActionPerformed

    private void passCodeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_passCodeActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_passCodeActionPerformed

    public void init() {
        initComponents();
        this.setLocationRelativeTo(null);//to set everything in frame to the center of the frame
        this.setSize(1280, 800);
        this.setVisible(true);
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JPanel LobbyPanel;
    private javax.swing.JButton b_createLobby;
    private javax.swing.JButton b_joinLobby;
    private javax.swing.JLabel gameTitle;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JTextField passCode;
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

    public JTextField getPassCode() {
        return passCode;
    }

    public void setPassCode(JTextField passCode) {
        this.passCode = passCode;
    }

    @Override
    public void onSwitch() {
        this.setTitle(MainRunner.getGameContext().getPlayers()[0].getPlayer().getUsername());
    }
}
