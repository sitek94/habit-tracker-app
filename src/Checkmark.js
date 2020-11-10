import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useFirebase } from 'services/firebase';

import { green, yellow } from '@material-ui/core/colors';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  IndeterminateCheckBox as CheckboxFailedIcon,
} from '@material-ui/icons';

const COMPLETED = 1;
const SKIPPED = 2;
const FAILED = 3;

const Checkmark = ({ habitId, date }) => {
  const { db } = useFirebase();

  const [value, setValue] = useState(0);

  const handleClick = () => {
    // Get next item from the values

    const nextValue = (value + 1) % 4;

    toggleCheckmark(nextValue);
  };

  useEffect(() => {
    db.ref(`habitCheckmarks/${habitId}/${date}`)
      .once('value')
      .then(snapshot => {
        const val = snapshot.val();

        console.log(snapshot);

        if (val) setValue(val);
      });
  }, [db, habitId, date]);

  const toggleCheckmark = async value => {
    try {
      db.ref(`habitCheckmarks/${habitId}/${date}`).set(value);

      setValue(value);
      console.log('toggled');
    } catch (error) {
      console.log(error);
    }
  };

  let icon;

  console.log(value);

  // Render icon depending on the value of the controller
  switch (value) {
    case COMPLETED:
      icon = <CheckBoxIcon style={{ color: green[500] }} />;
      break;

    case SKIPPED:
      icon = <CheckBoxIcon style={{ color: yellow[700] }} />;
      break;

    case FAILED:
      icon = <CheckboxFailedIcon color="secondary" />;
      break;

    default:
      icon = <CheckBoxBlankIcon />;
      break;
  }

  return (
    <div>
      <h1>Checkmark</h1>
      <hr />
      <IconButton onClick={handleClick}>{icon}</IconButton>
    </div>
  );
};

export default Checkmark;
