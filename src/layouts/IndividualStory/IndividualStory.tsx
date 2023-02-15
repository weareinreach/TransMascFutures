import { Flex, Image, createStyles } from '@mantine/core'

export const IndividualStory = ({ age, image, name, pronouns, quotes }: Props) => {
	const useStyles = createStyles((theme) => ({
		story: {
			['& *']: {
				flex: 1,
			},
			[`@media (max-width: ${theme.breakpoints.md}px)`]: {
				flexDirection: 'column',
			},
		},
		content: {
			padding: '40px',
		},
		header: {
			fontSize: '1.8rem',
			fontWeight: 'bold',
			textTransform: 'uppercase',
		},
		label: {
			fontSize: '1.6rem',
			fontStyle: 'italic',
		},
		text: {},
	}))
	const { classes } = useStyles()

	const header = `${name}, ${pronouns}, ${age}`
	return (
		<Flex className={classes.story} align='center' direction='row'>
			<Image src={image} alt={'photo of individual'} />
			<div className={classes.content}>
				<div className={classes.header}>{header}</div>
				<Flex direction='column' gap='1rem'>
					{quotes.map((quote) => (
						<div key={quote.label} className='quote-wrapper'>
							<div className={classes.label}>{quote.label}.</div>
							<div className={classes.text}>&quot;{quote.text}&quot;</div>
						</div>
					))}
				</Flex>
			</div>
		</Flex>
	)
}

type Props = {
	age: number
	image: string
	name: string
	pronouns: string
	quotes: { label: string; text: string }[]
}
