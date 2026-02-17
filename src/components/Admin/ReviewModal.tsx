/* eslint-disable i18next/no-literal-string */
import { Badge, Button, Grid, Group, Modal, ScrollArea, Stack, Text, Title } from '@mantine/core'

interface ReviewModalProps {
	opened: boolean
	onClose: () => void
	onApprove: () => void
	onReject: () => void
	isLoading: boolean
	data?: {
		story: {
			name: string
			isInfluencer: boolean
			response1EN: string | null
			response2EN: string | null
		}
		crowdin: {
			response1: string
			response2: string
		}
	}
}

export const ReviewModal = ({ opened, onClose, onApprove, onReject, isLoading, data }: ReviewModalProps) => {
	return (
		<Modal opened={opened} onClose={onClose} title="Review Submission" size="xl">
			{isLoading || !data ? (
				<Text>Loading preview...</Text>
			) : (
				<Stack spacing="xl">
					<Group position="apart">
						<Text weight={700} size="lg">{data.story.name}</Text>
						<Badge color={data.story.isInfluencer ? 'blue' : 'gray'}>
							{data.story.isInfluencer ? 'Influencer' : 'Standard'}
						</Badge>
					</Group>

					<Grid>
						<Grid.Col span={6}>
							<Title order={5} mb="sm">English (Original)</Title>
							<ScrollArea h={200} type="auto" offsetScrollbars>
								<Text size="sm" color="dimmed" mb="xs">Prompt 1</Text>
								<Text mb="md">{data.story.response1EN}</Text>
								<Text size="sm" color="dimmed" mb="xs">Prompt 2</Text>
								<Text>{data.story.response2EN}</Text>
							</ScrollArea>
						</Grid.Col>
						<Grid.Col span={6}>
							<Title order={5} mb="sm">Spanish (Crowdin)</Title>
							<ScrollArea h={200} type="auto" offsetScrollbars>
								<Text size="sm" color="dimmed" mb="xs">Respuesta 1</Text>
								<Text mb="md" color={data.crowdin.response1 ? 'black' : 'red'}>{data.crowdin.response1 || 'Translation pending...'}</Text>
								<Text size="sm" color="dimmed" mb="xs">Respuesta 2</Text>
								<Text color={data.crowdin.response2 ? 'black' : 'red'}>{data.crowdin.response2 || 'Translation pending...'}</Text>
							</ScrollArea>
						</Grid.Col>
					</Grid>

					<Group position="right" mt="md">
						<Button color="red" variant="outline" onClick={onReject}>Reject (Spam/Troll)</Button>
						<Button color="green" onClick={onApprove}>Approve & Publish</Button>
					</Group>
				</Stack>
			)}
		</Modal>
	)
}
