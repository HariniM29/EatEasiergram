import React from 'react';
import { useStyles } from '../styles';

export default function Logo(props) {
  const styles = useStyles();
  return (
    <img
      src="/images/logo-removebg-preview.png"
      alt="Food Order"
      className={props.large ? styles.largeLogo : styles.logo}
    ></img>
  );
}
