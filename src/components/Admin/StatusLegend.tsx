/* eslint-disable i18next/no-literal-string */
import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core'
import { IconCheck, IconExternalLink, IconRefresh, IconRotateClockwise, IconX } from '@tabler/icons-react'

const TranslationBadge = ({ color, label }: { color: string; label: string }) => (
	<Group spacing={5}>
		<div
			style={{
				width: 22,
				height: 22,
				borderRadius: '50%',
				backgroundColor: color,
				color: 'white',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: 10,
				fontWeight: 700,
				cursor: 'default',
			}}
		>
			ES
		</div>
		<Text size='sm'>{label}</Text>
	</Group>
)

export const StatusLegend = () => {
	return (
		<Paper p='md' mb='lg' withBorder>
			<Stack spacing='md'>
				<Group spacing='xl'>
					<Group spacing='xs'>
						<ActionIcon color='green' variant='filled' size='sm'>
							<IconCheck size='0.8rem' />
						</ActionIcon>
						<Text size='sm'>Approve & Publish</Text>
					</Group>
					<Group spacing='xs'>
						<ActionIcon color='red' variant='filled' size='sm'>
							<IconX size='0.8rem' />
						</ActionIcon>
						<Text size='sm'>Reject</Text>
					</Group>
					<Group spacing='xs'>
						<ActionIcon color='gray' variant='filled' size='sm'>
							<IconRotateClockwise size='0.8rem' />
						</ActionIcon>
						<Text size='sm'>Restore to Pending</Text>
					</Group>
					<Group spacing='xs'>
						<ActionIcon color='blue' variant='filled' size='sm'>
							<IconRefresh size='0.8rem' />
						</ActionIcon>
						<Text size='sm'>Refresh Translations</Text>
					</Group>
					<Group spacing='xs'>
						<ActionIcon color='blue' variant='filled' size='sm'>
							<IconExternalLink size='0.8rem' />
						</ActionIcon>
						<Text size='sm'>Open in Crowdin</Text>
					</Group>
				</Group>

				<Group spacing='xl'>
					<TranslationBadge color='#40c057' label='Present in DB' />
					<TranslationBadge color='#228be6' label='Available in Crowdin' />
					<TranslationBadge color='#fa5252' label='Missing in Crowdin' />
					<TranslationBadge color='#868e96' label='Not in DB (Unchecked)' />
				</Group>
			</Stack>
		</Paper>
	)
}
