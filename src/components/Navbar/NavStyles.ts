import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
	glaadGray: {
		backgroundColor: theme.other.colors.glaadGray,
	},

	navbar: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%',

		['& a']: {
			color: theme.colors.gray[0],
			flexDirection: 'row',
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: theme.fontSizes.lg,
		},

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	burger: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '100%',

		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	navlink: {
		color: theme.colors.gray[0],
		display: 'flex',
		width: '100%',
		height: '100%',
		fontStyle: 'italic',
		flexDirection: 'column',
		marginTop: theme.spacing.md,
		marginBottom: theme.spacing.md,
		textDecoration: 'none',

		['&:active, &:hover']: {
			textDecoration: 'underline',
		},
	},
}))
