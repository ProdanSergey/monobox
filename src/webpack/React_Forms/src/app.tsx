import { FunctionComponent } from "react";
import { StyledForm } from "./shared/layout/form.styled";
import { TextField, AutocompleteOption, AutocompleteTextField } from "./templates/residence-form/text-field";
import { Form, FormSubmit, FormValidate } from "./components/form";

type LocationForm = {
  city: string;
  region: string;
};

const initialValues: LocationForm = {
  city: "",
  region: "",
};

const autocompleteRegions: AutocompleteOption[] = [{ value: "Bavaria" }, { value: "Hamburg" }];

export const App: FunctionComponent = () => {
  const submit: FormSubmit<LocationForm> = (values) => {
    console.log(values);
  };

  const validate: FormValidate<LocationForm> = (values) => {
    const errors: ReturnType<FormValidate<LocationForm>> = {};

    if (!values.city) {
      errors.city = "City is required";
    }

    return errors;
  };

  return (
    <div>
      <header>
        <h1>React Forms</h1>
      </header>
      <main>
        <section>
          <Form<LocationForm> initialValues={initialValues} validate={validate} onSubmit={submit}>
            {({ values, errors, change, submit }) => (
              <StyledForm onSubmit={submit}>
                <TextField
                  label="City of residence"
                  name="city"
                  value={values.city}
                  error={errors.city}
                  onChange={({ name, value }) => change({ [name]: value })}
                />
                <AutocompleteTextField
                  label="Region of residence"
                  name="region"
                  value={values.region}
                  error={errors.region}
                  onChange={({ name, value }) => change({ [name]: value })}
                  options={autocompleteRegions}
                />
                <button type="submit">Submit</button>
              </StyledForm>
            )}
          </Form>
        </section>
      </main>
    </div>
  );
};
