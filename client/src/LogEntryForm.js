import React,{useState} from "react";
import { useForm } from "react-hook-form";
import {createLogEntries} from "./API";


const LogEntryForm = ({location,onClose}) => {

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntries(data);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
    {error?(<h3>{error}</h3>):null}
      <label htmlFor="title">Title</label>
      <input {...register("title",{required:true})}/>
      <label htmlFor="comments">Comments</label>
      <textarea rows={3} {...register("comments")}></textarea>
      <label htmlFor="description">Description</label>
      <textarea rows={3} {...register("description")}></textarea>
      <label htmlFor="image" >Image</label>
      <input {...register("image")}/>
      <label htmlFor="visitDate">Visit Date</label>
      <input type="date" {...register("visitDate",{required:true})} />
      <button disabled={loading}>{ loading ? 'Loading...': 'Create'}</button>
    </form>
  );
};

export default LogEntryForm;
