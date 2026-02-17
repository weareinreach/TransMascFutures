/* eslint-disable i18next/no-literal-string */
import { Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconCheck, IconRotateClockwise, IconX } from '@tabler/icons-react'

export const StatusLegend = () => {
	return (
		<Paper withBorder p='md' mb='md' radius='md'>
			<Text size='xs' weight={700} mb='sm' color='dimmed' transform='uppercase'>
				Legend
			</Text>
			<Group mb='md' spacing='xl'>
				<Group spacing='xs'>
					<ThemeIcon color='green' variant='filled' size='sm'>
						<IconCheck size='0.8rem' />
					</ThemeIcon>
					<Text size='sm' color='dimmed'>
						Approve & Publish
					</Text>
				</Group>
				<Group spacing='xs'>
					<ThemeIcon color='gray' variant='filled' size='sm'>
						<IconRotateClockwise size='0.8rem' />
					</ThemeIcon>
					<Text size='sm' color='dimmed'>
						Restore to Pending / Unpublish
					</Text>
				</Group>
				<Group spacing='xs'>
					<ThemeIcon color='red' variant='filled' size='sm'>
						<IconX size='0.8rem' />
					</ThemeIcon>
					<Text size='sm' color='dimmed'>
						Reject
					</Text>
				</Group>
			</Group>

			<Stack spacing={0}>
				<Text size='xs' color='dimmed' sx={{ fontFamily: 'monospace' }}>
					DB: published: false, textToxicity: null = &apos;Not Reviewed&apos;
				</Text>
				<Text size='xs' color='dimmed' sx={{ fontFamily: 'monospace' }}>
					DB: published: true, textToxicity: 0 = &apos;Reviewed & Published&apos;
				</Text>
				<Text size='xs' color='dimmed' sx={{ fontFamily: 'monospace' }}>
					DB: published: false, textToxicity: 1.0 = &apos;Reviewed & Rejected&apos;
				</Text>
				<Text size='xs' color='dimmed' sx={{ fontFamily: 'monospace' }}>
					DB: published: false, textToxicity: 0 = &apos;Unpublished&apos;
				</Text>
			</Stack>
		</Paper>
	)
}
