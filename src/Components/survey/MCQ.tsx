import React, { useEffect } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { iAnswered } from "./Survey";


export default function Mcq(props: {
  id: number;
  handleChange: Function;
  choosed: iAnswered;
}) {
  const answers = [
    {
      value: '1',
      label: "غير موافق تماما"

    },
    {
      value: '2',
      label: "غير موافق"

      
    },
    {
      value: '3',
      label: "الي حد ما"
    },
    {
      value: '4',
      label: "موافق"
    },
    {
      value: '5',
      label: "موافق جدا"

    }
  ];
  
  const [value, setValue] = React.useState('0');

  useEffect(() => {
    setValue(props.choosed ? props.choosed.answerId : '0');
  }, [props.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    props.handleChange((event.target as HTMLInputElement).value , props.id);
  };
  
  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          name={"question" + props.id}
          value={value}
          onChange={
            handleChange
          }
        >
          {answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={answer.value}
              control={<Radio />}
              label={answer.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
