/* eslint-disable i18next/no-literal-string */
import { Box, Center, createStyles, Group, rem, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react'

import { themeCustomObj } from '~/styles/theme'

const useStyles = createStyles((theme) => ({
	th: {
		color: themeCustomObj.colors.softBlack,
		fontWeight: 700,
		padding: '0 !important',
		whiteSpace: 'nowrap',
	},
	control: {
		width: '100%',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},

	icon: {
		width: rem(21),
		height: rem(21),
		borderRadius: rem(21),
	},
}))

interface ThProps {
	children: React.ReactNode
	reversed?: boolean
	sorted?: boolean
	onSort?: () => void
}

export function SortableTh({ children, reversed, sorted, onSort }: ThProps) {
	const { classes } = useStyles()
	if (!onSort) {
		return (
			<th className={classes.th}>
				<Box className={classes.control}>
					<Text fw={700} fz="sm">
						{children}
					</Text>
				</Box>
			</th>
		)
	}

	const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector
	return (
		<th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group position="apart" noWrap>
					<Text fw={700} fz="sm">
						{children}
					</Text>
					{Icon && (
						<Center className={classes.icon}>
							<Icon size="0.9rem" stroke={1.5} />
						</Center>
					)}
				</Group>
			</UnstyledButton>
		</th>
	)
}
