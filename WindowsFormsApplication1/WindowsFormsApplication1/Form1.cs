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
    public partial class Form1 : Form
    {
        private OleDbConnection connection = new OleDbConnection();
        public Form1()
        {
            InitializeComponent();
            connection.ConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=BD.accdb;
Persist Security Info=False;";
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                connection.Open();
                label1.Text = "Соединение с базой установлено.";
                OleDbCommand command = new OleDbCommand();
                command.Connection = connection;
                string query = "DELETE *FROM [Информация о выданных субсидиях] WHERE [Дата окончания]<NOW();";
                command.CommandText = query;
                command.ExecuteNonQuery();
                MessageBox.Show("Устаревшие данные удаляются из базы автоматически!");
                connection.Close();
                
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error " + ex);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string a, b, user, pass;
            a = "adm";
            b = "123";
            user = Convert.ToString(textBox1.Text);
            pass = Convert.ToString(textBox2.Text);
            if (user == a && pass == b)
            {
                this.Hide();
                Form2 f2 = new Form2();
                f2.ShowDialog();
               
            }
            else MessageBox.Show("NOT CORRECT!");

           
        }

    }
}
