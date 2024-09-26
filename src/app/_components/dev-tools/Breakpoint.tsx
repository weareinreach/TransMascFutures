import classes from './Breakpoint.module.css'

export const Breakpoint = () => {
	if (process.env.NODE_ENV !== 'production') {
		return <span id='breakpoint-indicator' className={classes.breakpoint}></span>
	}
	return null
}
