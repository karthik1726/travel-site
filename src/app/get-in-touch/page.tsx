"use client";

import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";


export default function ContactPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => alert(JSON.stringify(data, null, 2));

  return (
    <div className="max-w-min mx-auto p-6"><br /><br />
      <h1 className="text-xl font-bold mb-4 text-center">Get in Touch</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register("name")} placeholder="Name" required />
        <Input {...register("contact")} placeholder="Contact Number" required />
        <Input {...register("email")} type="email" placeholder="Email" required />
        <select {...register("budget")} className="border rounded-lg px-4 py-2 w-full">
          {["50,000 - 1 Lakh", "1 Lakh - 2 Lakhs", "2 Lakhs - 3 Lakhs", "3 Lakhs+"].map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
    
  );
}
