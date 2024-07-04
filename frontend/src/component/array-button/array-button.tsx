import { FieldArray } from 'formik';

interface ArrayButtonProps {
  name: string;
  options: Record<string, string>;
  values: string[];
  disabled?: boolean;
}

export function ArrayButton({
  name,
  values,
  options,
  disabled,
}: Readonly<ArrayButtonProps>) {
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div className="specialization-checkbox questionnaire-user__specializations">
          {Object.values(options).map((type) => (
            <div className="btn-checkbox" key={type}>
              <label>
                <input
                  className="visually-hidden"
                  type="checkbox"
                  name="workout"
                  value={type}
                  checked={values.includes(type)}
                  disabled={disabled}
                  onChange={(e) => {
                    if (e.target.checked) {
                      arrayHelpers.push(type);
                    } else {
                      const idx = values.indexOf(type);
                      arrayHelpers.remove(idx);
                    }
                  }}
                />
                <span className="btn-checkbox__btn">{type}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    />
  );
}
