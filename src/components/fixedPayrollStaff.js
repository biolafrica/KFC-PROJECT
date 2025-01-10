import {useForm} from "../hooks/useForm"
import axios from "axios";
import { useParams } from "react-router-dom";

const UnpaidStaff =(props)=>{
  const payroll = props.data
  const {id} = useParams();
  console .log("mine", payroll )

  const initialValues = {
    basic_pay : payroll.basic_pay ,
    bonuses : payroll.bonuses,
    deductions : payroll.deductions,
    lateness_fine : payroll.lateness_fine,
    loan : payroll.loan,
    net_pay : payroll.net_pay,
    pension : payroll.pension,
    tax : payroll.tax,

  }
  const {formData, handleInputChange, resetForm} = useForm (initialValues)

  const handleSubmitForm = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/admin/payroll/${id}`, formData);
      alert("payroll information updated successfully!");
      
    } catch (error) {
      console.error("Error updating payroll information . Please try again");
      
    };
  }

  return(
    
    <form className="unpaid_staff" onSubmit={handleSubmitForm}>

      <div className="newstaff_column">

        <div>
          <label htmlFor="basic_pay"><h4>Basic Pay</h4></label>
          <input 
            type="text" 
            placeholder="Enter amount"
            name="basic_pay"
            value={formData.basic_pay} 
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="loan"><h4>Loan</h4></label>
          <input 
            type="text" 
            placeholder="Enter amount"
            name="loan"
            value={formData.loan}
            onChange={handleInputChange} 
          />
        </div>

      </div>

      <div className="newstaff_column">

        <div>
          <label htmlFor="lateness_fine"><h4>Lateness</h4></label>
          <input 
            type="text" 
            placeholder="Enter amount"
            name="lateness_fine"
            value={formData.lateness_fine} 
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="pension"><h4>Pension</h4></label>
          <input 
            type="text" 
            placeholder="Enter amount"
            name="pension"
            value={formData.pension} 
            onChange={handleInputChange}
          />
        </div>

      </div>

      <div className="newstaff_column">

        <div>
          <label htmlFor="deductions"><h4>Deduction</h4></label>
          <input 
            type="text" 
            placeholder="Enter amount"
            name="deductions"
            value={formData.deductions}
            onChange={handleInputChange} 
          />
        </div>

        <div>
          <label htmlFor="bonuses"><h4>Bonuses</h4></label>
          <input 
            type="text" 
            placeholder="Enter amount"
            name="bonuses"
            value={formData.bonuses} 
            onChange={handleInputChange}
          />
        </div>

      </div>

      <div className="newstaff_column">

        <div>
          <label htmlFor="tax"><h4>Payee Tax</h4></label>
          <input 
            type="text" 
            placeholder="Enter payee tax" 
            name="tax"
            value={formData.tax}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="net_pay"><h4>Net Pay</h4></label>
          <input 
            type="text"
            placeholder="Enter net pay" 
            name="net_pay"
            value={formData.net_pay}
            onChange={handleInputChange}
            readOnly
          />
        </div>

      </div>

      <button className="filled-btn" type="submit"><h4>Update</h4></button>

    </form>

  )
}

const PaidStaff =(props)=>{
  const payroll = props.data === null ? 0 : props.data;

  return(

    <div className="paid_staff">

      <div className="staff_row">
        <h4>Basic Pay</h4>
        <h4>&#8358;{payroll.basic_pay}</h4>
      </div>

      <div className="staff_row">
        <h4>Bonuses</h4>
        <h4>&#8358;{payroll.bonuses}</h4>
      </div>

      <div className="staff_row">
        <h4>Loan</h4>
        <h4>&#8358;{payroll.loan}</h4>
      </div>

      <div className="staff_row">
        <h4>Late Fine</h4>
        <h4>&#8358;{payroll.lateness_fine}</h4>
      </div>

      <div className="staff_row">
        <h4>Pension </h4>
        <h4>&#8358;{payroll.pension}</h4>
      </div>

      <div className="staff_row">
        <h4>Deduction</h4>
        <h4>&#8358;{payroll.deductions}</h4>
      </div>

      <div className="staff_row">
        <h4>Tax</h4>
        <h4>&#8358;{payroll.tax}</h4>
      </div>

      <div className="staff_row">
        <h4>Net Pay</h4>
        <h4>&#8358;{payroll.net_pay}</h4>
      </div>

    </div>
    
  )

}

export {
  UnpaidStaff,
  PaidStaff
};