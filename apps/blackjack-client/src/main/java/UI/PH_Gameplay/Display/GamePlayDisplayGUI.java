
package UI.PH_Gameplay.Display;
import UI.Controller.CustomFrame;
import java.awt.Label;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 *
 * @author Suchanan
 */
public class GamePlayDisplayGUI extends CustomFrame {

    public Object getDeckCardPanel;

    public GamePlayDisplayGUI() {
        initComponents();
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
        buttonPanelPlayerOne = new javax.swing.JPanel();
        hitButtonPlayerOne = new javax.swing.JButton();
        standButtonPlayerOne = new javax.swing.JButton();
        scoreCardOneLabel = new javax.swing.JLabel();
        playerOneTable = new javax.swing.JPanel();
        playerTwoTable = new javax.swing.JPanel();
        trumpChipPlayerTwoPanel = new javax.swing.JPanel();
        playerOneNamePanel = new javax.swing.JPanel();
        trumpHoldChipPlayerOnePanel = new javax.swing.JPanel();
        trumpChipPlayerOnePanel = new javax.swing.JPanel();
        playerTwoNamePanel = new javax.swing.JPanel();
        scoreGamePlayerOnePanel = new javax.swing.JPanel();
        scoreGamePlayerOneLabel = new javax.swing.JLabel();
        playerOneNameScoreLabel = new java.awt.Label();
        scoreGamePlayerTwoPanel = new javax.swing.JPanel();
        scoreGamePlayerTwoLabel = new javax.swing.JLabel();
        playerTwoNameScoreLabel = new java.awt.Label();
        trumpHoldChipPlayerTwoPanel = new javax.swing.JPanel();
        vsPanel = new javax.swing.JPanel();
        vsLabel = new javax.swing.JLabel();
        buttonPanelPlayerTwo = new javax.swing.JPanel();
        hitButtonPlayerTwo = new javax.swing.JButton();
        standButtonPlayerTwo = new javax.swing.JButton();
        scoreCardTwoLabel = new javax.swing.JLabel();
        deckCardPanel = new javax.swing.JPanel();
        deckCardBackground = new javax.swing.JLabel();
        background = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setResizable(false);
        setSize(new java.awt.Dimension(0, 0));

        gamePlayPanel.setBackground(new java.awt.Color(204, 255, 153));
        gamePlayPanel.setPreferredSize(new java.awt.Dimension(1280, 800));
        gamePlayPanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        buttonPanelPlayerOne.setBackground(new java.awt.Color(153, 153, 153));
        buttonPanelPlayerOne.setForeground(new java.awt.Color(255, 255, 255));
        buttonPanelPlayerOne.setPreferredSize(new java.awt.Dimension(150, 200));

        hitButtonPlayerOne.setBackground(new java.awt.Color(0, 0, 0));
        hitButtonPlayerOne.setFont(new java.awt.Font("Book Antiqua", 1, 20)); // NOI18N
        hitButtonPlayerOne.setForeground(new java.awt.Color(255, 255, 255));
        hitButtonPlayerOne.setText("Hit");

        standButtonPlayerOne.setBackground(new java.awt.Color(255, 0, 0));
        standButtonPlayerOne.setFont(new java.awt.Font("Book Antiqua", 1, 20)); // NOI18N
        standButtonPlayerOne.setForeground(new java.awt.Color(255, 255, 0));
        standButtonPlayerOne.setText("Stand");

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
        playerTwoTable.setPreferredSize(new java.awt.Dimension(720, 330));
        gamePlayPanel.add(playerTwoTable, new org.netbeans.lib.awtextra.AbsoluteConstraints(330, 10, 730, 240));

        trumpChipPlayerTwoPanel.setBackground(new java.awt.Color(51, 51, 51));
        gamePlayPanel.add(trumpChipPlayerTwoPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(400, 260, 600, 70));

        playerOneNamePanel.setBackground(new java.awt.Color(102, 102, 102));
        gamePlayPanel.add(playerOneNamePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 640, 250, 90));

        trumpHoldChipPlayerOnePanel.setBackground(new java.awt.Color(0, 0, 0));

        javax.swing.GroupLayout trumpHoldChipPlayerOnePanelLayout = new javax.swing.GroupLayout(trumpHoldChipPlayerOnePanel);
        trumpHoldChipPlayerOnePanel.setLayout(trumpHoldChipPlayerOnePanelLayout);
        trumpHoldChipPlayerOnePanelLayout.setHorizontalGroup(
            trumpHoldChipPlayerOnePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 250, Short.MAX_VALUE)
        );
        trumpHoldChipPlayerOnePanelLayout.setVerticalGroup(
            trumpHoldChipPlayerOnePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 160, Short.MAX_VALUE)
        );

        gamePlayPanel.add(trumpHoldChipPlayerOnePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 460, 250, 160));

        trumpChipPlayerOnePanel.setBackground(new java.awt.Color(51, 51, 51));
        trumpChipPlayerOnePanel.setAutoscrolls(true);
        trumpChipPlayerOnePanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());
        gamePlayPanel.add(trumpChipPlayerOnePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(400, 440, 600, 70));

        playerTwoNamePanel.setBackground(new java.awt.Color(102, 102, 102));
        gamePlayPanel.add(playerTwoNamePanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 40, 250, 90));

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

        trumpHoldChipPlayerTwoPanel.setBackground(new java.awt.Color(0, 0, 0));

        javax.swing.GroupLayout trumpHoldChipPlayerTwoPanelLayout = new javax.swing.GroupLayout(trumpHoldChipPlayerTwoPanel);
        trumpHoldChipPlayerTwoPanel.setLayout(trumpHoldChipPlayerTwoPanelLayout);
        trumpHoldChipPlayerTwoPanelLayout.setHorizontalGroup(
            trumpHoldChipPlayerTwoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 250, Short.MAX_VALUE)
        );
        trumpHoldChipPlayerTwoPanelLayout.setVerticalGroup(
            trumpHoldChipPlayerTwoPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 160, Short.MAX_VALUE)
        );

        gamePlayPanel.add(trumpHoldChipPlayerTwoPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 140, 250, 160));

        vsPanel.setBackground(new java.awt.Color(0, 0, 0));
        vsPanel.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        vsLabel.setFont(new java.awt.Font("Segoe UI", 0, 36)); // NOI18N
        vsLabel.setForeground(new java.awt.Color(255, 255, 255));
        vsLabel.setText("VS");
        vsPanel.add(vsLabel, new org.netbeans.lib.awtextra.AbsoluteConstraints(10, 0, 60, 60));

        gamePlayPanel.add(vsPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(670, 350, 70, 60));

        buttonPanelPlayerTwo.setBackground(new java.awt.Color(153, 153, 153));

        hitButtonPlayerTwo.setBackground(new java.awt.Color(0, 0, 0));
        hitButtonPlayerTwo.setFont(new java.awt.Font("Book Antiqua", 1, 20)); // NOI18N
        hitButtonPlayerTwo.setForeground(new java.awt.Color(255, 255, 255));
        hitButtonPlayerTwo.setText("Hit");

        standButtonPlayerTwo.setBackground(new java.awt.Color(255, 0, 0));
        standButtonPlayerTwo.setFont(new java.awt.Font("Book Antiqua", 1, 20)); // NOI18N
        standButtonPlayerTwo.setForeground(new java.awt.Color(255, 255, 0));
        standButtonPlayerTwo.setText("Stand");

        scoreCardTwoLabel.setFont(new java.awt.Font("Segoe UI", 0, 30)); // NOI18N
        scoreCardTwoLabel.setForeground(new java.awt.Color(255, 255, 255));
        scoreCardTwoLabel.setText("Score : ");

        javax.swing.GroupLayout buttonPanelPlayerTwoLayout = new javax.swing.GroupLayout(buttonPanelPlayerTwo);
        buttonPanelPlayerTwo.setLayout(buttonPanelPlayerTwoLayout);
        buttonPanelPlayerTwoLayout.setHorizontalGroup(
            buttonPanelPlayerTwoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(buttonPanelPlayerTwoLayout.createSequentialGroup()
                .addGap(25, 25, 25)
                .addGroup(buttonPanelPlayerTwoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(standButtonPlayerTwo, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(hitButtonPlayerTwo, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(25, Short.MAX_VALUE))
            .addGroup(buttonPanelPlayerTwoLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(scoreCardTwoLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );
        buttonPanelPlayerTwoLayout.setVerticalGroup(
            buttonPanelPlayerTwoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(buttonPanelPlayerTwoLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(hitButtonPlayerTwo, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(standButtonPlayerTwo, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 33, Short.MAX_VALUE)
                .addComponent(scoreCardTwoLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(23, 23, 23))
        );

        gamePlayPanel.add(buttonPanelPlayerTwo, new org.netbeans.lib.awtextra.AbsoluteConstraints(1120, 10, 150, 210));

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
        gamePlayPanel.add(background, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 1280, 800));

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


    public void init() {
        initComponents();
        playerTwoTable.setBorder(javax.swing.BorderFactory.createMatteBorder(30, 30, 30, 30, new javax.swing.ImageIcon("resources/Table.PNG")));
        playerOneTable.setBorder(javax.swing.BorderFactory.createMatteBorder(30, 30, 30, 30, new javax.swing.ImageIcon("resources/Table.PNG")));
        hitButtonPlayerOne.setIcon(new javax.swing.ImageIcon("resources/HitButton_1.PNG"));
        hitButtonPlayerTwo.setIcon(new javax.swing.ImageIcon("resources/HitButton_1.PNG"));
        standButtonPlayerTwo.setIcon(new javax.swing.ImageIcon("resources/StandButton_1.PNG"));
        standButtonPlayerOne.setIcon(new javax.swing.ImageIcon("resources/StandButton_1.PNG"));
        deckCardBackground.setIcon(new javax.swing.ImageIcon("resources/download.png"));
        background.setIcon(new javax.swing.ImageIcon("resources/GamePlayBackground.PNG"));
        this.setLocationRelativeTo(null);
        this.setSize(1280, 800);
        this.setVisible(true);
    }
    
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel background;
    private javax.swing.JPanel buttonPanelPlayerOne;
    private javax.swing.JPanel buttonPanelPlayerTwo;
    private javax.swing.JLabel deckCardBackground;
    private javax.swing.JPanel deckCardPanel;
    private javax.swing.JPanel gamePlayPanel;
    private javax.swing.JButton hitButtonPlayerOne;
    private javax.swing.JButton hitButtonPlayerTwo;
    private javax.swing.JPanel playerOneNamePanel;
    private java.awt.Label playerOneNameScoreLabel;
    private javax.swing.JPanel playerOneTable;
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
    private javax.swing.JButton standButtonPlayerTwo;
    private javax.swing.JPanel trumpChipPlayerOnePanel;
    private javax.swing.JPanel trumpChipPlayerTwoPanel;
    private javax.swing.JPanel trumpHoldChipPlayerOnePanel;
    private javax.swing.JPanel trumpHoldChipPlayerTwoPanel;
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

    public JButton getHitButtonPlayerTwo() {
        return hitButtonPlayerTwo;
    }

    public void setHitButtonPlayerTwo(JButton hitButtonPlayerTwo) {
        this.hitButtonPlayerTwo = hitButtonPlayerTwo;
    }

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

    public JButton getStandButtonPlayerTwo() {
        return standButtonPlayerTwo;
    }

    public void setStandButtonPlayerTwo(JButton standButtonPlayerTwo) {
        this.standButtonPlayerTwo = standButtonPlayerTwo;
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

    public JPanel getTrumpHoldChipPlayerTwoPanel() {
        return trumpHoldChipPlayerTwoPanel;
    }

    public void setTrumpHoldChipPlayerTwoPanel(JPanel trumpHoldChipPlayerTwoPanel) {
        this.trumpHoldChipPlayerTwoPanel = trumpHoldChipPlayerTwoPanel;
    }

    public JLabel getDeckCardBackground() {
        return deckCardBackground;
    }

    public void setDeckCardBackground(JLabel deckCardBackground) {
        this.deckCardBackground = deckCardBackground;
    }
    
}