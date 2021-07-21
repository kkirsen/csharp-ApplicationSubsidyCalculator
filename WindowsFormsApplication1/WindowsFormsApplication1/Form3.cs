using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.OleDb;
namespace WindowsFormsApplication1
{
    public partial class Form3 : Form
    {
        public Form3()
        {
            InitializeComponent();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Hide();
            Form2 f2 = new Form2();
            f2.ShowDialog();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            tariffs tar = new tariffs();
            tar.ShowDialog();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            subsidies sub = new subsidies();
            sub.ShowDialog();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            customer cus = new customer();
            cus.ShowDialog();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            documents doc = new documents();
            doc.ShowDialog();
        }
    }
}
