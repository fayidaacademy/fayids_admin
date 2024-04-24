import AddPaymentMethodForm from "@/app/forms/createPaymentMethod";
import React from "react";

export default function CreatePaymentMethod() {
  return (
    <div>
      <div>
        <h1>Create Payment Method</h1>
      </div>
      <div>
        <AddPaymentMethodForm />
      </div>
    </div>
  );
}
