using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.OleDb;
using System.Net;
namespace WindowsFormsApplication1
{
    public partial class calculator : Form
    {
        private OleDbConnection connection = new OleDbConnection();
        public calculator()
        {
            InitializeComponent();
            connection.ConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=BD.accdb;
Persist Security Info=False;";
        }

        private void calculator_Load(object sender, EventArgs e)
        {
            try
            {
                connection.Open();
                OleDbCommand command = new OleDbCommand();
                command.Connection = connection;
                string query = "select * from [Тарифы регионов]";
                command.CommandText = query;

                OleDbDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    comboBox1.Items.Add(reader["Название региона"].ToString());
                }
                connection.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error  " + ex);
            }
        }


        private void comboBox1_SelectedIndexChanged_1(object sender, EventArgs e)
        {
            try
            {
                connection.Open();
                OleDbCommand command = new OleDbCommand();
                command.Connection = connection;
                string query = "select * from [Тарифы регионов] where [Название региона]= '" + comboBox1.Text + "'";
                command.CommandText = query;

                OleDbDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    textBox1.Text = reader["Для трудоспособных граждан"].ToString();
                    textBox2.Text = reader["Для пенсионеров"].ToString();
                    textBox3.Text = reader["Для детей"].ToString();
                }

                connection.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error  " + ex);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            double t1 =  Convert.ToDouble(textBox1.Text);
            double t2 =  Convert.ToDouble(textBox2.Text);
            double t3 =  Convert.ToDouble(textBox3.Text);
            double t4 =  Convert.ToDouble(textBox4.Text);
            double t5 =  Convert.ToDouble(textBox5.Text);
            double t6 =  Convert.ToDouble(textBox6.Text);
            double t7 =  Convert.ToDouble(textBox7.Text);
            //double t8 =  Convert.ToDouble(textBox8.Text);
            double t9 =  Convert.ToDouble(textBox9.Text);

            //количество человек в семье
            double kol = 0;
            kol = t4 + t5 + t6;

            //Стандартная сумма оплаты ЖКУ
            double SSOJKU = 0;
            SSOJKU = 175.8 * 18 * kol;
            //общий доход семьи   t7

            //Прожиточный минимум t1 для t4    t2 для t5     t3 для t6
            double PM = 0;
            PM = t1 * t4 + t2 * t5 + t3 * t6;
            double coeff = 0;
            coeff = PM / t7;
            if (coeff < 1) coeff = 1;
           

            //максимально возможную сумму оплаты ЖКУ семьей
            double max = 0;
            max = (t9 / 100) * t7;
            //размер субсидии
            double PC = 0;
            PC = SSOJKU - max;
            textBox10.Text = PC.ToString();
            
            

        }

    }
}
