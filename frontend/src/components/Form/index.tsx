"use client";
import { FC, PropsWithChildren } from "react";
import { FormProvider } from "react-hook-form";
import React from 'react'

type FormProps = {
  methods: any;
  submitText: string;
  onSubmit: (data: any) => void;
};

const Form: FC<PropsWithChildren<FormProps>> = ({
  onSubmit,
  children,
  methods,
  submitText,
}) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <input type="submit" value={submitText} />
      </form>
    </FormProvider>
  );
};

export default Form;
