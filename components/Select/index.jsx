import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const SelectPeople = ({Options, isOptionSelected}) => {

  const handleChange = (selected) => {
    isOptionSelected(selected)
  }

  return (
    <>
        <div className="w-full my-2">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              placeholder="Digite ou selecione um nome"
              noOptionsMessage={() => "Coloborador não encontrado"}
              options={Options.map((option) => ({label: option.nome, value: option.id}))}
              onChange={handleChange}
            />
        </div>
    </>
  );
}

export default SelectPeople