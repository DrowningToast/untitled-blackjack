package UI.Demo.Display;

public class LoginDisplayGUI extends javax.swing.JFrame {

    public LoginDisplayGUI() {
    }
    public void init() {
        initComponents();
        this.setExtendedState(this.MAXIMIZED_BOTH);
        this.setVisible(true);
    }
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        gameTitle = new javax.swing.JLabel();
        playerInputName = new javax.swing.JTextField();
        loginPanel = new javax.swing.JButton();
        loginBackground = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setResizable(false);
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        gameTitle.setFont(new java.awt.Font("Book Antiqua", 1, 100)); // NOI18N
        gameTitle.setText("Untitled-BlackJack");
        getContentPane().add(gameTitle, new org.netbeans.lib.awtextra.AbsoluteConstraints(200, 160, -1, -1));

        playerInputName.setFont(new java.awt.Font("Book Antiqua", 1, 24)); // NOI18N
        getContentPane().add(playerInputName, new org.netbeans.lib.awtextra.AbsoluteConstraints(450, 370, 370, 50));

        loginPanel.setBackground(new java.awt.Color(255, 204, 0));
        loginPanel.setFont(new java.awt.Font("Book Antiqua", 1, 24)); // NOI18N
        loginPanel.setText("Login");
        getContentPane().add(loginPanel, new org.netbeans.lib.awtextra.AbsoluteConstraints(450, 450, 370, 40));

        loginBackground.setIcon(new javax.swing.ImageIcon(getClass().getResource("/resources/loginBackground.PNG"))); // NOI18N
        getContentPane().add(loginBackground, new org.netbeans.lib.awtextra.AbsoluteConstraints(-310, -80, -1, -1));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel gameTitle;
    private javax.swing.JLabel loginBackground;
    private javax.swing.JButton loginPanel;
    private javax.swing.JTextField playerInputName;
    // End of variables declaration//GEN-END:variables
}
