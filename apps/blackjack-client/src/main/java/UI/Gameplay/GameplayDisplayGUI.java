
package UI.Gameplay;

import Internal.Websocket.Controller.WebsocketController;
import Main.MainRunner;
import Internal.UserInterface.CustomFrame;

import java.awt.Label;
import java.awt.TextArea;

import java.io.IOException;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 * @author Suchanan
 */
public class GameplayDisplayGUI extends CustomFrame {

    public Object getDeckCardPanel;
    public GameplayController controller;
    public WebsocketController wsController;

    public GameplayDisplayGUI(GameplayController controller, WebsocketController wsController) {
        this.wsController = wsController;
        this.controller = controller;
        initComponents();
        playerTwoTable.setBorder(javax.swing.BorderFactory.createMatteBorder(30, 30, 30, 30, new javax.swing.ImageIcon("resources/Table.PNG")));
        playerOneTable.setBorder(javax.swing.BorderFactory.createMatteBorder(30, 30, 30, 30, new javax.swing.ImageIcon("resources/Table.PNG")));
        deckCardBackground.setIcon(new javax.swing.ImageIcon("resources/back.png"));
        background.setIcon(new javax.swing.ImageIcon("resources/GamePlayBackground.PNG"));
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        gamePlayPanel = new javax.swing.JPanel();
        trumpHoldChipPlayerOnePanel = new javax.swing.JPanel();
        buttonPanelPlayerOne = new javax.swing.JPanel();
        hitButtonPlayerOne = new javax.swing.JButton();
        standButtonPlayerOne = new javax.swing.JButton();
        scoreCardOneLabel = new javax.swing.JLabel();
        playerOneTable = new javax.swing.JPanel();
        playerTwoTable = new javax.swing.JPanel();
        trumpChipPlayerTwoPanel = new javax.swing.JPanel();
        playerOneNamePanel = new javax.swing.JPanel();
        playerOneNameLabel = new javax.swing.JLabel();
        trumpChipPlayerOnePanel = new javax.swing.JPanel();
        playerTwoNamePanel = new javax.swing.JPanel();
        playerTwoNameLabel = new javax.swing.JLabel();
        chatPanel = new javax.swing.JPanel();
        gameplayTextArea = new java.awt.TextArea();
        scoreGamePlayerOnePanel = new javax.swing.JPanel();
        scoreGamePlayerOneLabel = new javax.swing.JLabel();
        playerOneNameScoreLabel = new java.awt.Label();
        scoreGamePlayerTwoPanel = new javax.swing.JPanel();
        scoreGamePlayerTwoLabel = new javax.swing.JLabel();
        playerTwoNameScoreLabel = new java.awt.Label();
        vsPanel = new javax.swing.JPanel();
        vsLabel = new javax.swing.JLabel();
        buttonPanelPlayerTwo = new javax.swing.JPanel();
        scoreCardTwoLabel = new javax.swing.JLabel();
        deckCardPanel = new javax.swing.JPanel();
        deckCardBackground = new javax.swing.JLabel();
        background = new javax.swing.JLabel();
        thrumChipButton = new javax.swing.JButton();
        iconAssetJPanel = new javax.swing.JPanel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setResizable(false);
        setSize(new java.awt.Dimension(0, 0));

        gamePlayPanel.setBackground(new java.awt.Color(204, 255, 153));
        gamePlayPanel.setPreferredSize(new java.awt.Dimension(1280, 800));
        gamePlayPanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        trumpHoldChipPlayerOnePanel.setBackground(new java.awt.Color(0, 0, 0));
        gamePlayPanel.add(trumpHoldChipPlayerOnePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 440, 250, 160));

        buttonPanelPlayerOne.setBackground(new java.awt.Color(153, 153, 153));
        buttonPanelPlayerOne.setForeground(new java.awt.Color(255, 255, 255));
        buttonPanelPlayerOne.setPreferredSize(new java.awt.Dimension(150, 200));

        hitButtonPlayerOne.setBackground(new java.awt.Color(0, 0, 0));
        hitButtonPlayerOne.setFont(new java.awt.Font("Book Antiqua", 1, 20)); // NOI18N
        hitButtonPlayerOne.setForeground(new java.awt.Color(255, 255, 255));
        hitButtonPlayerOne.setText("Hit");
        hitButtonPlayerOne.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                try {
                    hitButtonPlayerOneActionPerformed(evt);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        standButtonPlayerOne.setBackground(new java.awt.Color(255, 0, 0));
        standButtonPlayerOne.setFont(new java.awt.Font("Book Antiqua", 1, 20)); // NOI18N
        standButtonPlayerOne.setForeground(new java.awt.Color(255, 255, 0));
        standButtonPlayerOne.setText("Stand");
        standButtonPlayerOne.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                try {
                    standButtonPlayerOneActionPerformed(evt);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        scoreCardOneLabel.setFont(new java.awt.Font("Segoe UI", 0, 30)); // NOI18N
        scoreCardOneLabel.setForeground(new java.awt.Color(255, 255, 255));
        scoreCardOneLabel.setText("Score : ");
        scoreCardOneLabel.setPreferredSize(new java.awt.Dimension(150, 100));

        javax.swing.GroupLayout buttonPanelPlayerOneLayout = new javax.swing.GroupLayout(buttonPanelPlayerOne);
        buttonPanelPlayerOne.setLayout(buttonPanelPlayerOneLayout);
        buttonPanelPlayerOneLayout.setHorizontalGroup(
            buttonPanelPlayerOneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(buttonPanelPlayerOneLayout.createSequentialGroup()
                .addGroup(buttonPanelPlayerOneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(buttonPanelPlayerOneLayout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(scoreCardOneLabel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(buttonPanelPlayerOneLayout.createSequentialGroup()
                        .addGap(28, 28, 28)
                        .addGroup(buttonPanelPlayerOneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(hitButtonPlayerOne, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(standButtonPlayerOne, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE))))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        buttonPanelPlayerOneLayout.setVerticalGroup(
            buttonPanelPlayerOneLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(buttonPanelPlayerOneLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(hitButtonPlayerOne, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(standButtonPlayerOne, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(scoreCardOneLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 70, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(16, Short.MAX_VALUE))
        );

        gamePlayPanel.add(buttonPanelPlayerOne, new org.netbeans.lib.awtextra.AbsoluteConstraints(1118, 520, 156, 212));

        playerOneTable.setBackground(new java.awt.Color(102, 0, 0));
        gamePlayPanel.add(playerOneTable, new org.netbeans.lib.awtextra.AbsoluteConstraints(330, 520, 730, 240));

        playerTwoTable.setBackground(new java.awt.Color(102, 0, 0));
        playerTwoTable.setBorder(new javax.swing.border.MatteBorder(null));
        playerTwoTable.setPreferredSize(new java.awt.Dimension(720, 330));
        gamePlayPanel.add(playerTwoTable, new org.netbeans.lib.awtextra.AbsoluteConstraints(330, 10, 730, 240));

        trumpChipPlayerTwoPanel.setBackground(new java.awt.Color(51, 51, 51));
        gamePlayPanel.add(trumpChipPlayerTwoPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(400, 260, 600, 70));

        playerOneNamePanel.setBackground(new java.awt.Color(102, 102, 102));

        playerOneNameLabel.setFont(new java.awt.Font("Book Antiqua", 1, 24)); // NOI18N
        playerOneNameLabel.setForeground(new java.awt.Color(255, 255, 255));
        playerOneNameLabel.setPreferredSize(new java.awt.Dimension(250, 90));
        playerOneNamePanel.add(playerOneNameLabel);

        gamePlayPanel.add(playerOneNamePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 660, 250, 90));

        trumpChipPlayerOnePanel.setBackground(new java.awt.Color(51, 51, 51));
        trumpChipPlayerOnePanel.setAutoscrolls(true);
        trumpChipPlayerOnePanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());
        gamePlayPanel.add(trumpChipPlayerOnePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(400, 440, 600, 70));

        playerTwoNamePanel.setBackground(new java.awt.Color(102, 102, 102));

        playerTwoNameLabel.setFont(new java.awt.Font("Book Antiqua", 1, 24)); // NOI18N
        playerTwoNameLabel.setForeground(new java.awt.Color(255, 255, 255));
        playerTwoNameLabel.setPreferredSize(new java.awt.Dimension(250, 90));
        playerTwoNamePanel.add(playerTwoNameLabel);

        gamePlayPanel.add(playerTwoNamePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 20, 250, 90));

        chatPanel.setBackground(new java.awt.Color(51, 51, 51));

        gameplayTextArea.setBackground(new java.awt.Color(51, 51, 51));
        gameplayTextArea.setEditable(false);
        gameplayTextArea.setForeground(new java.awt.Color(255, 255, 255));

        javax.swing.GroupLayout chatPanelLayout = new javax.swing.GroupLayout(chatPanel);
        chatPanel.setLayout(chatPanelLayout);
        chatPanelLayout.setHorizontalGroup(
            chatPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, chatPanelLayout.createSequentialGroup()
                .addGap(0, 0, Short.MAX_VALUE)
                .addComponent(gameplayTextArea, javax.swing.GroupLayout.PREFERRED_SIZE, 250, javax.swing.GroupLayout.PREFERRED_SIZE))
        );
        chatPanelLayout.setVerticalGroup(
            chatPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(chatPanelLayout.createSequentialGroup()
                .addComponent(gameplayTextArea, javax.swing.GroupLayout.PREFERRED_SIZE, 262, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );

        gamePlayPanel.add(chatPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 120, 250, 260));

        scoreGamePlayerOneLabel.setFont(new java.awt.Font("Segoe UI", 0, 48)); // NOI18N
        scoreGamePlayerOneLabel.setText("0");

        playerOneNameScoreLabel.setBackground(new java.awt.Color(0, 0, 0));
        playerOneNameScoreLabel.setForeground(new java.awt.Color(255, 255, 255));

        javax.swing.GroupLayout scoreGamePlayerOnePanelLayout = new javax.swing.GroupLayout(scoreGamePlayerOnePanel);
        scoreGamePlayerOnePanel.setLayout(scoreGamePlayerOnePanelLayout);
        scoreGamePlayerOnePanelLayout.setHorizontalGroup(
            scoreGamePlayerOnePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, scoreGamePlayerOnePanelLayout.createSequentialGroup()
                .addComponent(playerOneNameScoreLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 298, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(scoreGamePlayerOneLabel)
                .addContainerGap())
        );
        scoreGamePlayerOnePanelLayout.setVerticalGroup(
            scoreGamePlayerOnePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(scoreGamePlayerOneLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addGroup(scoreGamePlayerOnePanelLayout.createSequentialGroup()
                .addComponent(playerOneNameScoreLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );

        gamePlayPanel.add(scoreGamePlayerOnePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(310, 340, 340, 80));

        scoreGamePlayerTwoLabel.setFont(new java.awt.Font("Segoe UI", 0, 48)); // NOI18N
        scoreGamePlayerTwoLabel.setText("0");

        playerTwoNameScoreLabel.setBackground(new java.awt.Color(0, 0, 0));
        playerTwoNameScoreLabel.setForeground(new java.awt.Color(255, 255, 255));

        javax.swing.GroupLayout scoreGamePlayerTwoPanelLayout = new javax.swing.GroupLayout(scoreGamePlayerTwoPanel);
        scoreGamePlayerTwoPanel.setLayout(scoreGamePlayerTwoPanelLayout);
        scoreGamePlayerTwoPanelLayout.setHorizontalGroup(
            scoreGamePlayerTwoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(scoreGamePlayerTwoPanelLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(scoreGamePlayerTwoLabel)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(playerTwoNameScoreLabel, javax.swing.GroupLayout.DEFAULT_SIZE, 288, Short.MAX_VALUE))
        );
        scoreGamePlayerTwoPanelLayout.setVerticalGroup(
            scoreGamePlayerTwoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(scoreGamePlayerTwoLabel, javax.swing.GroupLayout.DEFAULT_SIZE, 80, Short.MAX_VALUE)
            .addComponent(playerTwoNameScoreLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        gamePlayPanel.add(scoreGamePlayerTwoPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(760, 340, 330, 80));

        vsPanel.setBackground(new java.awt.Color(0, 0, 0));
        vsPanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        vsLabel.setFont(new java.awt.Font("Segoe UI", 0, 36)); // NOI18N
        vsLabel.setForeground(new java.awt.Color(255, 255, 255));
        vsLabel.setText("VS");
        vsPanel.add(vsLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(10, 0, 60, 60));

        gamePlayPanel.add(vsPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(670, 350, 70, 60));

        buttonPanelPlayerTwo.setBackground(new java.awt.Color(153, 153, 153));

        scoreCardTwoLabel.setFont(new java.awt.Font("Segoe UI", 0, 30)); // NOI18N
        scoreCardTwoLabel.setForeground(new java.awt.Color(255, 255, 255));
        scoreCardTwoLabel.setText("Score : ");

        javax.swing.GroupLayout buttonPanelPlayerTwoLayout = new javax.swing.GroupLayout(buttonPanelPlayerTwo);
        buttonPanelPlayerTwo.setLayout(buttonPanelPlayerTwoLayout);
        buttonPanelPlayerTwoLayout.setHorizontalGroup(
            buttonPanelPlayerTwoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(buttonPanelPlayerTwoLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(scoreCardTwoLabel, javax.swing.GroupLayout.DEFAULT_SIZE, 148, Short.MAX_VALUE)
                .addContainerGap())
        );
        buttonPanelPlayerTwoLayout.setVerticalGroup(
            buttonPanelPlayerTwoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(buttonPanelPlayerTwoLayout.createSequentialGroup()
                .addComponent(scoreCardTwoLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 10, Short.MAX_VALUE))
        );

        gamePlayPanel.add(buttonPanelPlayerTwo, new org.netbeans.lib.awtextra.AbsoluteConstraints(1100, 10, 160, 60));

        deckCardPanel.setPreferredSize(new java.awt.Dimension(107, 157));

        javax.swing.GroupLayout deckCardPanelLayout = new javax.swing.GroupLayout(deckCardPanel);
        deckCardPanel.setLayout(deckCardPanelLayout);
        deckCardPanelLayout.setHorizontalGroup(
            deckCardPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(deckCardBackground, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        deckCardPanelLayout.setVerticalGroup(
            deckCardPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(deckCardBackground, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        gamePlayPanel.add(deckCardPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(1107, 247, 150, 210));
        gamePlayPanel.add(background, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 1280, 790));

        thrumChipButton.setFont(new java.awt.Font("Book Antiqua", 1, 18)); // NOI18N
        thrumChipButton.setText("Use");
        gamePlayPanel.add(thrumChipButton, new org.netbeans.lib.awtextra.AbsoluteConstraints(110, 610, 100, 40));

        iconAssetJPanel.setBackground(new java.awt.Color(204, 204, 204));

        javax.swing.GroupLayout iconAssetJPanelLayout = new javax.swing.GroupLayout(iconAssetJPanel);
        iconAssetJPanel.setLayout(iconAssetJPanelLayout);
        iconAssetJPanelLayout.setHorizontalGroup(
            iconAssetJPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 160, Short.MAX_VALUE)
        );
        iconAssetJPanelLayout.setVerticalGroup(
            iconAssetJPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 150, Short.MAX_VALUE)
        );

        gamePlayPanel.add(iconAssetJPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(1100, 80, 160, 150));

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addComponent(gamePlayPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(gamePlayPanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void hitButtonPlayerOneActionPerformed(java.awt.event.ActionEvent evt) throws IOException {//GEN-FIRST:event_hitButtonPlayerOneActionPerformed
        wsController.sendHit();
    }//GEN-LAST:event_hitButtonPlayerOneActionPerformed

    private void standButtonPlayerOneActionPerformed(java.awt.event.ActionEvent evt) throws IOException {                                                     
        wsController.sendStand();
    }                                                     


    public void init() {
        initComponents();
        this.setLocationRelativeTo(null);
        this.setSize(1280, 800);
        this.setVisible(true);
    }


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel background;
    private javax.swing.JPanel buttonPanelPlayerOne;
    private javax.swing.JPanel buttonPanelPlayerTwo;
    private javax.swing.JPanel chatPanel;
    private javax.swing.JLabel deckCardBackground;
    private javax.swing.JPanel deckCardPanel;
    private javax.swing.JPanel gamePlayPanel;
    private java.awt.TextArea gameplayTextArea;
    private javax.swing.JButton hitButtonPlayerOne;
    private javax.swing.JPanel iconAssetJPanel;
    private javax.swing.JLabel playerOneNameLabel;
    private javax.swing.JPanel playerOneNamePanel;
    private java.awt.Label playerOneNameScoreLabel;
    private javax.swing.JPanel playerOneTable;
    private javax.swing.JLabel playerTwoNameLabel;
    private javax.swing.JPanel playerTwoNamePanel;
    private java.awt.Label playerTwoNameScoreLabel;
    private javax.swing.JPanel playerTwoTable;
    private javax.swing.JLabel scoreCardOneLabel;
    private javax.swing.JLabel scoreCardTwoLabel;
    private javax.swing.JLabel scoreGamePlayerOneLabel;
    private javax.swing.JPanel scoreGamePlayerOnePanel;
    private javax.swing.JLabel scoreGamePlayerTwoLabel;
    private javax.swing.JPanel scoreGamePlayerTwoPanel;
    private javax.swing.JButton standButtonPlayerOne;
    private javax.swing.JButton thrumChipButton;
    private javax.swing.JPanel trumpChipPlayerOnePanel;
    private javax.swing.JPanel trumpChipPlayerTwoPanel;
    private javax.swing.JPanel trumpHoldChipPlayerOnePanel;
    private javax.swing.JLabel vsLabel;
    private javax.swing.JPanel vsPanel;
    // End of variables declaration//GEN-END:variables

    public Object getGetDeckCardPanel() {
        return getDeckCardPanel;
    }

    public void setGetDeckCardPanel(Object getDeckCardPanel) {
        this.getDeckCardPanel = getDeckCardPanel;
    }

    public JPanel getButtonPanelPlayerOne() {
        return buttonPanelPlayerOne;
    }

    public void setButtonPanelPlayerOne(JPanel buttonPanelPlayerOne) {
        this.buttonPanelPlayerOne = buttonPanelPlayerOne;
    }

    public JPanel getButtonPanelPlayerTwo() {
        return buttonPanelPlayerTwo;
    }

    public void setButtonPanelPlayerTwo(JPanel buttonPanelPlayerTwo) {
        this.buttonPanelPlayerTwo = buttonPanelPlayerTwo;
    }

    public JPanel getDeckCardPanel() {
        return deckCardPanel;
    }

    public void setDeckCardPanel(JPanel deckCardPanel) {
        this.deckCardPanel = deckCardPanel;
    }

    public JPanel getGamePlayPanel() {
        return gamePlayPanel;
    }

    public void setGamePlayPanel(JPanel gamePlayPanel) {
        this.gamePlayPanel = gamePlayPanel;
    }

    public JButton getHitButtonPlayerOne() {
        return hitButtonPlayerOne;
    }

    public void setHitButtonPlayerOne(JButton hitButtonPlayerOne) {
        this.hitButtonPlayerOne = hitButtonPlayerOne;
    }

//    public JButton getHitButtonPlayerTwo() {
//        return hitButtonPlayerTwo;
//    }
//
//    public void setHitButtonPlayerTwo(JButton hitButtonPlayerTwo) {
//        this.hitButtonPlayerTwo = hitButtonPlayerTwo;
//    }

    public JPanel getPlayerOneNamePanel() {
        return playerOneNamePanel;
    }

    public void setPlayerOneNamePanel(JPanel playerOneNamePanel) {
        this.playerOneNamePanel = playerOneNamePanel;
    }

    public Label getPlayerOneNameScoreLabel() {
        return playerOneNameScoreLabel;
    }

    public void setPlayerOneNameScoreLabel(Label playerOneNameScoreLabel) {
        this.playerOneNameScoreLabel = playerOneNameScoreLabel;
    }

    public JPanel getPlayerOneTable() {
        return playerOneTable;
    }

    public void setPlayerOneTable(JPanel playerOneTable) {
        this.playerOneTable = playerOneTable;
    }

    public JPanel getPlayerTwoNamePanel() {
        return playerTwoNamePanel;
    }

    public void setPlayerTwoNamePanel(JPanel playerTwoNamePanel) {
        this.playerTwoNamePanel = playerTwoNamePanel;
    }

    public Label getPlayerTwoNameScoreLabel() {
        return playerTwoNameScoreLabel;
    }

    public void setPlayerTwoNameScoreLabel(Label playerTwoNameScoreLabel) {
        this.playerTwoNameScoreLabel = playerTwoNameScoreLabel;
    }

    public JPanel getPlayerTwoTable() {
        return playerTwoTable;
    }

    public void setPlayerTwoTable(JPanel playerTwoTable) {
        this.playerTwoTable = playerTwoTable;
    }

    public JLabel getScoreCardOneLabel() {
        return scoreCardOneLabel;
    }

    public void setScoreCardOneLabel(JLabel scoreCardOneLabel) {
        this.scoreCardOneLabel = scoreCardOneLabel;
    }

    public JLabel getScoreCardTwoLabel() {
        return scoreCardTwoLabel;
    }

    public void setScoreCardTwoLabel(JLabel scoreCardTwoLabel) {
        this.scoreCardTwoLabel = scoreCardTwoLabel;
    }

    public JLabel getScoreGamePlayerOneLabel() {
        return scoreGamePlayerOneLabel;
    }

    public void setScoreGamePlayerOneLabel(JLabel scoreGamePlayerOneLabel) {
        this.scoreGamePlayerOneLabel = scoreGamePlayerOneLabel;
    }

    public JPanel getScoreGamePlayerOnePanel() {
        return scoreGamePlayerOnePanel;
    }

    public void setScoreGamePlayerOnePanel(JPanel scoreGamePlayerOnePanel) {
        this.scoreGamePlayerOnePanel = scoreGamePlayerOnePanel;
    }

    public JLabel getScoreGamePlayerTwoLabel() {
        return scoreGamePlayerTwoLabel;
    }

    public void setScoreGamePlayerTwoLabel(JLabel scoreGamePlayerTwoLabel) {
        this.scoreGamePlayerTwoLabel = scoreGamePlayerTwoLabel;
    }

    public JPanel getScoreGamePlayerTwoPanel() {
        return scoreGamePlayerTwoPanel;
    }

    public void setScoreGamePlayerTwoPanel(JPanel scoreGamePlayerTwoPanel) {
        this.scoreGamePlayerTwoPanel = scoreGamePlayerTwoPanel;
    }

    public JButton getStandButtonPlayerOne() {
        return standButtonPlayerOne;
    }

    public void setStandButtonPlayerOne(JButton standButtonPlayerOne) {
        this.standButtonPlayerOne = standButtonPlayerOne;
    }

    public JPanel getTrumpChipPlayerOnePanel() {
        return trumpChipPlayerOnePanel;
    }

    public void setTrumpChipPlayerOnePanel(JPanel trumpChipPlayerOnePanel) {
        this.trumpChipPlayerOnePanel = trumpChipPlayerOnePanel;
    }

    public JPanel getTrumpChipPlayerTwoPanel() {
        return trumpChipPlayerTwoPanel;
    }

    public void setTrumpChipPlayerTwoPanel(JPanel trumpChipPlayerTwoPanel) {
        this.trumpChipPlayerTwoPanel = trumpChipPlayerTwoPanel;
    }

    public JPanel getTrumpHoldChipPlayerOnePanel() {
        return trumpHoldChipPlayerOnePanel;
    }

    public void setTrumpHoldChipPlayerOnePanel(JPanel trumpHoldChipPlayerOnePanel) {
        this.trumpHoldChipPlayerOnePanel = trumpHoldChipPlayerOnePanel;
    }

    public JLabel getDeckCardBackground() {
        return deckCardBackground;
    }

    public void setDeckCardBackground(JLabel deckCardBackground) {
        this.deckCardBackground = deckCardBackground;
    }

    public JPanel getChatPanel() {
        return chatPanel;
    }

    public void setChatPanel(JPanel chatPanel) {
        this.chatPanel = chatPanel;
    }

    public TextArea getGameplayTextArea() {
        return gameplayTextArea;
    }

    public void setGameplayTextArea(TextArea gameplayTextArea) {
        this.gameplayTextArea = gameplayTextArea;
    }

    public JPanel getIconAssetJPanel() {
        return iconAssetJPanel;
    }

    public void setIconAssetJPanel(JPanel iconAssetJPanel) {
        this.iconAssetJPanel = iconAssetJPanel;
    }

    public JButton getThrumChipButton() {
        return thrumChipButton;
    }

    public void setThrumChipButton(JButton thrumChipButton) {
        this.thrumChipButton = thrumChipButton;
    }

    @Override
    public void onSwitch() {
        playerOneNameLabel.setText(MainRunner.getGameContext().getPlayers()[0].getPOJO().getUsername());
        playerTwoNameLabel.setText(MainRunner.getGameContext().getPlayers()[1].getPOJO().getUsername());
    }

    @Override
    public void onUpdate() {
        controller.updateStatusButton();
        controller.showCard(playerOneTable , scoreCardOneLabel,MainRunner.getGameContext().getPlayers()[0].getPOJO());
        controller.showCard(playerTwoTable ,scoreCardTwoLabel,MainRunner.getGameContext().getPlayers()[1].getPOJO());
        controller.showTrumpCard(trumpHoldChipPlayerOnePanel, MainRunner.getGameContext().getPlayers()[0].getPOJO());
        controller.updatePlayerScore();
    }
}
