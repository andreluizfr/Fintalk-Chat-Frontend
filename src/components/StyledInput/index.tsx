import './styles.scss';

import { InputHTMLAttributes, useEffect, forwardRef } from "react";
import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  warning?: string | undefined;
  hasShow?: boolean | undefined;
  theme?: string;
}

const StyledInput = (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {

  //desestruturação para pegar as props passadas para o component e o resto das props são repassadas para tag input
  const { title, warning, hasShow, theme, ...rest } = props;

  const languageStore = useSelector((state: StoreState) => state.language);

  //inicia a tag input com atributo wasBlured como falso, e o tema vindo dos parametros
  useEffect(() => {
    const input = document.getElementById(title+"Input");
    if (input) input.setAttribute("wasBlured", "false");
  }, []);

  //ao perder o foco do input muda o atributo wasBlured para true
  function wasBlured(event: React.FocusEvent<HTMLInputElement>) {
    event.target.setAttribute("wasBlured", "true");
  }

  function toggleShow(event: React.MouseEvent<HTMLElement>) {
    const styledInput = (event.target as HTMLElement).parentElement;
    const input = document.getElementById(title+"Input") as HTMLInputElement;

    const show = styledInput?.getElementsByClassName("Show")[0] as HTMLSpanElement;

    if (input.getAttribute("type") === "password") {
      input.setAttribute("type", "text");
      show.innerText = languageStore.labels.hide;
    } else if (input.getAttribute("type") === "text") {
      input.setAttribute("type", "password");
      show.innerText = languageStore.labels.show;
    }
  }

  //se foi passada a propriedade warning, coloca a tag p com o warning
  return (
    <div className='Styled-input'>
      <input {...rest} ref={ref} onBlur={wasBlured} id={title+"Input"} className="Input" data-theme={theme} data-validation={warning?true:false}/>
      {title ?
        <span className='Title' data-theme={theme} data-validation={warning?true:false}>{title}</span>
        :
        null
      }
      {warning ?
        <p className='Warning' data-theme={theme}>{warning}</p>
        :
        null
      }
      {hasShow ?
        <span className='Show' onClick={toggleShow} data-theme={theme}>{languageStore.labels.show}</span>
        :
        null
      }
    </div>
  );

};

export default forwardRef(StyledInput);