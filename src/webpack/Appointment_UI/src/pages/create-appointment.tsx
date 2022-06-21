import React, { useState, FunctionComponent } from "react";
import validator from "validator";
import { StyledSpacer } from "../components/spacer.styled";
import { createAppointment } from "../shared/api/appointment";
import { Appointment } from "../shared/domain/appointment";
import { StyledBlock, StyledWrapper } from "../components/layout.styled";
import {
  AppointmentForm,
  AppointmentFormErrors,
  AppointmentFormValues,
} from "../templates/create-appointment/form/form";
import { AppointmentOutput } from "../templates/create-appointment/output/output";

type Messages = Record<keyof AppointmentFormValues, string>;

const messages: Messages = {
  fullName: "Full Name is required",
  email: "Email is required and must have proper format",
};

type Validators = Record<keyof AppointmentFormValues, (value: unknown) => boolean>;

const validators: Validators = {
  fullName: (value) => {
    return typeof value === "string" && value.length > 0;
  },
  email: (value) => {
    return typeof value === "string" && validator.isEmail(value);
  },
};

const hasError = (errors: AppointmentFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

const mapErrors = (values: AppointmentFormValues): AppointmentFormErrors => {
  return Object.entries(validators).reduce((errors, [name, validator]) => {
    const key = name as keyof AppointmentFormValues;

    if (!validator(values[key])) {
      return { ...errors, [name]: messages[key] };
    }

    return errors;
  }, {});
};

export const CreateAppointmentPage: FunctionComponent = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [formValues, setValue] = useState<AppointmentFormValues>({
    fullName: "",
    email: "",
  });
  const [errors, setErrors] = useState<AppointmentFormErrors>({});

  return (
    <StyledWrapper>
      <StyledBlock>
        <AppointmentForm
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
          <StyledSpacer size="m" />
          <StyledBlock>
            <AppointmentOutput appointment={appointment} />
          </StyledBlock>
        </>
      )}
    </StyledWrapper>
  );
};
