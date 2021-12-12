import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './giftcode.module.css';
import Image from "next/image";
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';
import transitionStyles from './transition.module.css';
import { useStoreContext } from "../../../contexts/StoreDataContext";

const ACTION_TYPE = {
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
  idle: 'idle',
  reset: 'reset',
}
const duration = 500;

function useSafeDispatch(dispatch) {
  const mountedRef = React.useRef(false)

  React.useLayoutEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return React.useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

function asyncReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.pending: {
      return {status: ACTION_TYPE.pending, data: null, error: null}
    }
    case ACTION_TYPE.resolved: {
      return {status: ACTION_TYPE.resolved, data: action.data, error: null}
    }
    case ACTION_TYPE.rejected: {
      return {status: ACTION_TYPE.rejected, data: null, error: action.error}
    }
    case ACTION_TYPE.reset: {
      return {status: ACTION_TYPE.idle, data: null, error: null}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: ACTION_TYPE.idle,
    data: null,
    error: null,
    ...initialState,
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const {data, error, status} = state

  const run = React.useCallback(
    promise => {
      dispatch({type: ACTION_TYPE.pending})
      promise.then(
        data => {
          dispatch({type: ACTION_TYPE.resolved, data})
        },
        error => {
          dispatch({type: ACTION_TYPE.rejected, error})
        },
      )
    },
    [dispatch],
  )
  const resetStatus = React.useCallback(
    () => {
      dispatch({type: ACTION_TYPE.reset})
    },
    [dispatch],
  )

  return {
    error,
    status,
    data,
    run,
    resetStatus
  }
}

const InputField = ({status, handleChange, handleValidateCode, code}) => {
  return (
    <div className={styles.inputBox}>
      <input 
        type="text" 
        className={styles.giftCode}
        placeholder="Have a Promo code?" 
        onChange={handleChange}
        value={code}
      />
      {code && 
        <button onClick={handleValidateCode} className={styles.arrowBtn}>
          <Image src='/right-arrow.png' layout="fixed" width="20" height="20" />
        </button>
      }
      </div>
  )
}

const LoadingDots = () => {
  return (
      <div className={styles.loader}>
        {'...'}
      </div>
  )
}
const FalseCode = () => {
  return (
      <div className={styles.wrongCode}>
        {'Wrong Code :('}
      </div>
  )
}

const AppliedCode = ({handleRemoveCode}) => {
  return (
      <div className={styles.appliedCode}>
        <span onClick={handleRemoveCode} className={styles.removeCode}>Remove</span>
        <span>
          {'🥳 '}<span className={styles.discountedAmount}>{'- '}{String.fromCharCode(0x20b9)}240</span>
        </span>
      </div>
  )
}

const AnimateGiftCode = ({status, handleChange, handleValidateCode, handleRemoveCode, code}) => {
  switch (status) {
    case ACTION_TYPE.idle:
      return (
        <InputField status={status} handleChange={handleChange} handleValidateCode={handleValidateCode} code={code} />
      )
      break;
    case ACTION_TYPE.pending : 
      return (
        <LoadingDots />
      )
      break;
    case ACTION_TYPE.rejected : 
      return (
        <FalseCode status={status} />
      )
      break;
    case ACTION_TYPE.resolved :
      return (
        <AppliedCode handleRemoveCode={handleRemoveCode} />
      )
      break;  
    default:
      break;
  }
}
const GiftCode = () => {
  const [code, setCode] = useState('');
  const storeData = useStoreContext();

  const {
    data,
    status,
    error,
    run,
    resetStatus,
  } = useAsync({
    status: 'idle',
  })

  const handleChange = (e) => {
    const {value} = e.target;
    setCode(value.toUpperCase());
  }
  const handleValidateCode = async (e) => {
    // do api call
    // fetch()
    // if(!code) return;

    let storeName = storeData.fields.store_name;
    let validateQuery = `/api/airtable/validatePromoCode?code=${code}&store=${storeName}`;
    
    // run(fetch(validateQuery))
    fetch(validateQuery)
    .then(
      res => console.log('====success'),
    )
    .catch(err => console.error('====errorr'))
    console.log('----------------------')
  }
  const handleRemoveCode = () => {
    resetStatus();
    setCode('');
  }
  return ( <>
  <TransitionGroup className={styles.giftCodeContainer}>
    <CSSTransition
      key={status}
      timeout={duration}
      classNames={transitionStyles}
      unmountOnExit
    >
      <AnimateGiftCode 
        status={status} 
        code={code} 
        handleChange={handleChange} 
        handleValidateCode={handleValidateCode} 
        handleRemoveCode={handleRemoveCode}
      />
    </CSSTransition>
  </TransitionGroup>
  </>)
}


export default GiftCode;
