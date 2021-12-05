import { useState } from 'react';
import styles from './giftcode.module.css';
import Image from "next/image";
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import transitionStyles from './transition.module.css';
// import '../../../public/reload.png';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

// const transitionStyles = {
//   entering: { opacity: 0 },
//   entered:  { opacity: 1 },
//   exiting:  { opacity: 1 },
//   exited:  { opacity: 0 },
// };

// const Fade = ({ in: inProp=true, children }) => (
//   <Transition in={inProp} timeout={duration}>
//     {state => (
//       <div style={{
//         ...defaultStyle,
//         ...transitionStyles[state]
//       }}>
//         {children}
//       </div>
//     )}
//   </Transition>
// );

const InputField = ({status, handleChange, code}) => {
  return (
    // <div className={styles.giftCodeContainer}>
    <div className={styles.inputBox}>
      <input 
        type="text" 
        className={styles.giftCode}
        placeholder="Have a Gift Code?" 
        onChange={handleChange}
        value={status === 'pending' ? '...' : code}
      />
      {code && 
        <button className={styles.arrowBtn}>
          <Image src='/right-arrow.png' layout="fixed" width="20" height="20" />
        </button>
      }
      </div>
    // </div>
  )
}

const LoadingDots = () => {
  return (
    // <div className={styles.giftCodeContainer}>
      <div className={styles.loader}>
        {'...'}
      </div>
    // </div>
  )
}
const FalseCode = () => {
  return (
    // <div className={styles.giftCodeContainer}>
      <div className={styles.wrongCode}>
        {'Wrong Code :('}
        <Image src='/reload.png' layout="fixed" width="20" height="20" />
      </div>
    // </div>
  )
}

const AppliedCode = () => {
  return (
    // <div className={styles.giftCodeContainer}>
      <div className={styles.appliedCode}>
        <span className={styles.removeCode}>Remove</span>
        <span>
          {'🥳 '}<span className={styles.discountedAmount}>{'- '}{String.fromCharCode(0x20b9)}240</span>
        </span>
      </div>
    // </div>
  )
}

const GetComponent = ({status, handleChange, code}) => {
  switch (status) {
    case 'idle':
      return (
        <InputField status={status} handleChange={handleChange} code={code} />
      )
      break;
    case 'pending' : 
      return (
        <LoadingDots />
      )
      break;
    case 'rejected' : 
      return (
        <FalseCode />
      )
      break;
    case 'resolved' :
      return (
        <AppliedCode />
      )
      break;  
    default:
      break;
  }
}
const GiftCode = () => {
  const [status, setStatus] = useState('idle');
  const [code, setCode] = useState('');
  const handleChange = (e) => {
    setStatus('resolved');
    // const {value} = e.target;
    // setCode(value.toUpperCase());
  }
  return ( <>
  <TransitionGroup className={styles.giftCodeContainer}>
      {/* <div className={styles.giftCodeContainer}> */}
    <CSSTransition
      key={status}
      timeout={500}
      classNames={transitionStyles}
      unmountOnExit
    >
        <GetComponent status={status} handleChange={handleChange} code={code} />
    </CSSTransition>
      {/* </div> */}
  </TransitionGroup>
  </>)
}


export default GiftCode;
