import PayslipTemplate from "./payslipTemplate";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { generateYearMonthWeeks } from "../formatmtime";
import {AlertPopup, useAlert } from "../alert";

const PayslipForm = ({payslips, staff})=>{
  console.log(payslips);
  const {currentYear, currentWeek, currentMonth} = generateYearMonthWeeks();
  const {alert, showAlert} = useAlert();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [payslipData, setPayslipData] = useState({});
  const [overlay, setOverlay] = useState("")

  const handleViewPayslip = (e)=>{
    e.preventDefault();
    let selectedPayslip = [];

    if (staff.employment_type === "fixed"){
      selectedPayslip = (payslips[selectedYear] || []).filter((months)=> {
        const optionMonth = new Date(months.createdAt).toLocaleString("default", {month: 'long'});
        return(optionMonth === selectedMonth)
      });

    }else{
      if(selectedMonth === ""){
        showAlert('Select month', "info");
      }else{
        selectedPayslip = payslips[selectedYear][selectedMonth].filter((weeks)=> {
        return(weeks.week === selectedWeek)
        })
      }
    }

    if(selectedPayslip.length > 0 ){
      setPayslipData(selectedPayslip[0]);
      setOverlay("overlay");
    }else {
      showAlert('Payslip not found for the selected month', "info");
    }
  }

  const downloadPayslipAsPDF = async () =>{
    const month = new Date(payslipData.createdAt).toLocaleString("default", {
      month: 'long', 
      year: "numeric"
    });

    const pdfContent = document.getElementById("payslip-template");
    const canvas = await html2canvas(pdfContent);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF()
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`${payslipData.week ? payslipData.week : month} - Payslip.pdf`);
  }

  const handleClose = ()=>{
    setPayslipData({});
    setOverlay("");

  }

  return(
    <>
      <div className={`${overlay}`}></div>

      {payslipData && payslipData._id && (
        <div className="payslip-template-container">

          <img 
            src="/icons/close alert.svg" 
            alt="cancel icon"
            onClick={handleClose}
            style={{cursor:"pointer"}} 
          />

          <div id="payslip-template" data-testid="payslip-template">
            <PayslipTemplate payslipData={payslipData} staff={staff}/>
          </div>

          <button 
            className="filled-btn"
            onClick={downloadPayslipAsPDF}
          >
            <h4>Download as PDF</h4> 
          </button>
          
        </div>
      )}

      <form onSubmit={handleViewPayslip} className="payslip_form">

        <h4 className="payslip_head">My Payslip</h4>

        <label htmlFor="Year"><h4>Year:</h4></label>
        <select
          id="Year"
          name="Year" 
          value={selectedYear}
          onChange={(e)=>setSelectedYear(e.target.value)}
          required 
        >
          {
            Object.keys(payslips)
            .map((year)=><option value={year} key={year}>{year}</option>)
          }
        
        </select>
      


        <label htmlFor="Payslip"><h4>Payslip:</h4></label>
        <select
          id="Payslip"
          name="Payslip" 
          value={selectedMonth}
          onChange={(e)=>setSelectedMonth(e.target.value)}
          required 
        >
          <option value="">Select Month</option>
          {staff.employment_type === "fixed" ?
            ((payslips[selectedYear] || [])
              .filter((month)=>{
                const optionMonth = new Date(month.createdAt).toLocaleString("default", {month: 'long'})
                return optionMonth !== currentMonth;
              })
              .map((filteredMonth)=>{
                const optionFilter = new Date(filteredMonth.createdAt).toLocaleString("default", {month: 'long'});
                return(<option value={optionFilter} key={optionFilter}>
                  {optionFilter} Payslip
                </option>)
              })
            ) :(Object.keys(payslips[selectedYear] || [])
              .map((month)=><option value={month} key={month}>{month}</option>)
            )
          }
         
        </select>
       


        {staff.employment_type === "contract" &&  (
          <>
            <label htmlFor="Weeks"><h4>Weeks:</h4></label>
            <select
              name="Weeks" 
              id="Weeks"
              value={selectedWeek}
              onChange={(e)=>setSelectedWeek(e.target.value)}
              required 
            >
              <option value="" >Select Week</option>
              {
                (payslips[selectedYear]?.[selectedMonth] || [])
                .filter((month)=>month.week !== currentWeek)
                .map((filteredWeek)=><option value={filteredWeek.week} key={filteredWeek.week}>{filteredWeek.week} Payslip</option>)
              }
            
            </select>
            
          </>
        )}

        <button type="submit" className="filled-btn"><h4>View Payslip</h4></button>

      </form>

      {alert.visible && (
        <AlertPopup 
          visible={alert.visible} 
          message={alert.message} 
          type={alert.type}
          
        />
      )}
      
    </>
  )

}

export default PayslipForm