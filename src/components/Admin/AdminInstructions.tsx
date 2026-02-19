/* eslint-disable i18next/no-literal-string */
import { Divider, Drawer, List, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

interface AdminInstructionsProps {
	opened: boolean
	onClose: () => void
}

export const AdminInstructions = ({ opened, onClose }: AdminInstructionsProps) => {
	return (
		<Drawer
			opened={opened}
			onClose={onClose}
			title={<Title order={3}>Admin Portal Instructions</Title>}
			padding='xl'
			size='lg'
			position='right'
		>
			<Stack spacing='lg'>
				<section>
					<Title order={4} mb='xs'>
						Overview
					</Title>
					<Text size='sm'>
						This dashboard allows you to review, translate, and publish user-submitted stories. Stories
						submitted via the website appear here as &quot;Not Reviewed&quot;.
					</Text>
				</section>

				<Divider />

				<section>
					<Title order={4} mb='xs'>
						Workflow
					</Title>
					<List
						spacing='sm'
						size='sm'
						center
						icon={
							<ThemeIcon color='blue' size={24} radius='xl'>
								<IconCheck size='1rem' />
							</ThemeIcon>
						}
					>
						<List.Item>
							<Text weight={700}>1. Review & Translate</Text>
							<Text color='dimmed'>
								Click on a row to expand it. This checks Crowdin for existing translations (Spanish/French).
								If found, they will appear in the preview.
							</Text>
						</List.Item>
						<List.Item>
							<Text weight={700}>2. Approve & Publish</Text>
							<Text color='dimmed'>
								Click the green checkmark. This fetches the latest text from Crowdin, saves it to the
								database, and makes the story live on the website.
							</Text>
						</List.Item>
						<List.Item>
							<Text weight={700}>3. Maintenance</Text>
							<Text color='dimmed'>
								If translations are added later, click the blue &quot;Refresh&quot; button on a published
								story to update the database without taking the story offline.
							</Text>
						</List.Item>
					</List>
				</section>

				<Divider />

				<section>
					<Title order={4} mb='xs'>
						Expected Results
					</Title>
					<Text size='sm' mb='sm'>
						Once a story is <strong>Published</strong> (Green status), it will immediately appear on the Home
						page.
					</Text>
					<Title order={5} size='sm' mb={4}>
						Multiple Categories?
					</Title>
					<Text size='sm' color='dimmed'>
						If a story is assigned multiple categories (e.g., &quot;Trans Man&quot; and &quot;BIPOC&quot;), it
						will appear in <strong>ALL</strong> corresponding category sections on the Home page. There is no
						single &quot;primary&quot; category; the story is displayed wherever its tags match.
					</Text>
				</section>
			</Stack>
		</Drawer>
	)
}
