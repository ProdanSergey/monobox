import React, { useState, FunctionComponent } from "react";
import validator from "validator";
import { StyledSpacerM } from "../components/spacer.styled";
import { createAppointment } from "../shared/api/appointment";
import { Appointment } from "../shared/domain/appointment";
import {
  CreateAppointmentForm,
  CreateAppointmentFormErrors,
  CreateAppointmentFormValues,
} from "../templates/create-appointment/form/form";
import { CreateAppointmentOutput } from "../templates/create-appointment/output/output";
import { StyledBlock, StyledWrapper } from "./create-appointment.styled";

type Messages = Record<keyof CreateAppointmentFormValues, string>;

const messages: Messages = {
  fullName: "Full Name is required",
  email: "Email is required and must have proper format",
};

type Validators = Record<keyof CreateAppointmentFormValues, (value: unknown) => boolean>;

const validators: Validators = {
  fullName: (value) => {
    return typeof value === "string" && value.length > 0;
  },
  email: (value) => {
    return typeof value === "string" && validator.isEmail(value);
  },
};

const hasError = (errors: CreateAppointmentFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

const mapErrors = (values: CreateAppointmentFormValues): CreateAppointmentFormErrors => {
  return Object.entries(validators).reduce((errors, [name, validator]) => {
    const key = name as keyof CreateAppointmentFormValues;

    if (!validator(values[key])) {
      return { ...errors, [name]: messages[key] };
    }

    return errors;
  }, {});
};

const mockedAppointment: Appointment = {
  _id: "AP/222/22/22/22",
  assignee: {
    fullName: "John Doe",
    email: "example@app.io",
  },
  completed: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const CreateAppointmentPage: FunctionComponent = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(mockedAppointment);
  const [formValues, setValue] = useState<CreateAppointmentFormValues>({
    fullName: "",
    email: "",
  });
  const [errors, setErrors] = useState<CreateAppointmentFormErrors>({});

  return (
    <StyledWrapper>
      <StyledBlock>
        <CreateAppointmentForm
          errors={errors}
          onChange={(name, value) => {
            if (hasError(errors)) {
              setErrors({});
            }

            setValue((formValues) => ({ ...formValues, [name]: value }));
          }}
          onSubmit={async () => {
            const errors = mapErrors(formValues);

            if (hasError(errors)) {
              setErrors(errors);
              return;
            }

            try {
              setAppointment(await createAppointment(formValues));
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </StyledBlock>
      {appointment && (
        <>
          <StyledSpacerM />
          <StyledBlock>
            <CreateAppointmentOutput appointment={appointment} />
          </StyledBlock>
        </>
      )}
    </StyledWrapper>
  );
};
