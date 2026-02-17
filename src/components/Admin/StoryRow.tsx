/* eslint-disable i18next/no-literal-string */
import { ActionIcon, Badge, Grid, Group, Text, Tooltip } from '@mantine/core'
import { IconCheck, IconRotateClockwise, IconX } from '@tabler/icons-react'

import { type RouterOutputs } from '~/utils/api'

type Story = RouterOutputs['admin']['getStories'][number]

export const StoryRow = <T extends Record<string, boolean>>({
	story,
	expanded,
	onToggle,
	onApprove,
	onReject,
	onUnpublish,
	visibleColumns,
}: {
	story: Story
	expanded: boolean
	onToggle: () => void
	onApprove: () => void
	onReject: () => void
	onUnpublish: () => void
	visibleColumns: T
}) => {
	const reviewStatus = story.published
		? { label: 'Reviewed & Published', color: 'green' }
		: story.textToxicity === 1.0
		? { label: 'Reviewed & Rejected', color: 'red' }
		: story.textToxicity === 0
		? { label: 'Unpublished', color: 'orange' }
		: { label: 'Not Reviewed', color: 'blue' }

	return (
		<>
			<tr onClick={onToggle} style={{ cursor: 'pointer' }}>
				<td>
					<Text
						size="xs"
						color="dimmed"
						style={{
							transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
							transition: 'transform 200ms ease',
						}}
					>
						▶
					</Text>
				</td>
				{visibleColumns.id && (
					<td>
						<Tooltip label={story.id} withArrow>
							<Text>{story.id.slice(-8)}</Text>
						</Tooltip>
					</td>
				)}
				{visibleColumns.name && (
					<td style={{ maxWidth: 120 }}>
						<Text lineClamp={1} title={story.name ?? ''}>
							{story.name}
						</Text>
					</td>
				)}
				{visibleColumns.categories && (
					<td style={{ minWidth: 150 }}>
						<Group spacing={4} noWrap={false}>
							{story.categories.map((c) => (
								<Badge key={c.categoryId} size="sm" variant="outline">
									{c.category.tag}
								</Badge>
							))}
						</Group>
					</td>
				)}
				{visibleColumns.response1EN && (
					<td style={{ maxWidth: 150 }}>
						<Text lineClamp={2} title={story.response1EN ?? ''}>
							{story.response1EN}
						</Text>
					</td>
				)}
				{visibleColumns.response2EN && (
					<td style={{ maxWidth: 150 }}>
						<Text lineClamp={2} title={story.response2EN ?? ''}>
							{story.response2EN}
						</Text>
					</td>
				)}
				{visibleColumns.published && (
					<td>
						<Badge color={story.published ? 'green' : 'gray'} variant="filled" size="sm">
							{story.published ? 'Yes' : 'No'}
						</Badge>
					</td>
				)}
				{visibleColumns.reviewed && (
					<td>
						<Badge color={reviewStatus.color}>{reviewStatus.label}</Badge>
					</td>
				)}
			</tr>
			{expanded && (
				<tr>
					<td colSpan={Object.values(visibleColumns).filter(Boolean).length + 2}>
						<Grid p="md">
							<Grid.Col span={6}>
								<Text weight={700} size="sm">Response 1 (English)</Text>
								<Text size="sm">{story.response1EN || 'N/A'}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size="sm">Response 2 (English)</Text>
								<Text size="sm">{story.response2EN || 'N/A'}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size="sm">Response 1 (Spanish)</Text>
								<Text size="sm">{story.response1ES || 'N/A'}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size="sm">Response 1 (French)</Text>
								<Text size="sm">{story.response1FR || 'N/A'}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size="sm">Response 2 (Spanish)</Text>
								<Text size="sm">{story.response2ES || 'N/A'}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size="sm">Response 2 (French)</Text>
								<Text size="sm">{story.response2FR || 'N/A'}</Text>
							</Grid.Col>
							<Grid.Col span={12}>
								<Group position="apart">
									<Text size="xs" color="dimmed" sx={{ fontFamily: 'monospace' }}>
										DB: published: {String(story.published)}, textToxicity: {story.textToxicity ?? 'null'}
									</Text>
									<Group position="right">
										{/* Approve: Show if NOT published */}
										{!story.published && (
											<Tooltip label="Approve & Publish">
												<ActionIcon color="green" variant="filled" size="lg" onClick={onApprove}>
													<IconCheck size="1.2rem" />
												</ActionIcon>
											</Tooltip>
										)}
										{/* Restore to Pending: Show if Published OR Rejected */}
										{(story.published || story.textToxicity === 1.0) && (
											<Tooltip label="Restore to Pending">
												<ActionIcon color="gray" variant="filled" size="lg" onClick={onUnpublish}>
													<IconRotateClockwise size="1.2rem" />
												</ActionIcon>
											</Tooltip>
										)}
										{/* Reject: Show if NOT Rejected */}
										{story.textToxicity !== 1.0 && (
											<Tooltip label="Reject">
												<ActionIcon color="red" variant="filled" size="lg" onClick={onReject}>
													<IconX size="1.2rem" />
												</ActionIcon>
											</Tooltip>
										)}
									</Group>
								</Group>
							</Grid.Col>
						</Grid>
					</td>
				</tr>
			)}
		</>
	)
}
