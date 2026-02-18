/* eslint-disable i18next/no-literal-string */
import { ActionIcon, Badge, Grid, Group, Text, Tooltip } from '@mantine/core'
import { IconCheck, IconRotateClockwise, IconX } from '@tabler/icons-react'
import { DateTime } from 'luxon'

import { api, type RouterOutputs } from '~/utils/api'

type Story = RouterOutputs['admin']['getStories'][number]

interface StoryRowProps<T extends Record<string, boolean>> {
	story: Story
	expanded: boolean
	onToggle: () => void
	onApprove: () => void
	onReject: () => void
	onUnpublish: () => void
	visibleColumns: T
}

export const StoryRow = <T extends Record<string, boolean>>({
	story,
	expanded,
	onToggle,
	onApprove,
	onReject,
	onUnpublish,
	visibleColumns,
}: StoryRowProps<T>): JSX.Element => {
	const reviewStatus = story.published
		? { label: 'Reviewed & Published', color: 'green' }
		: story.textToxicity === 1.0
			? { label: 'Reviewed & Rejected', color: 'red' }
			: story.textToxicity === 0
				? { label: 'Unpublished', color: 'orange' }
				: { label: 'Not Reviewed', color: 'blue' }
	console.log(story)
	// Total columns for the expanded row colspan
	const totalColumns = Object.values(visibleColumns).filter(Boolean).length + 1

	// Fetch live preview data from Crowdin when expanded
	const { data: previewData, isLoading: isLoadingPreview } = api.admin.getStoryPreview.useQuery(
		{ id: story.id },
		{ enabled: expanded, refetchOnWindowFocus: false }
	)

	return (
		<>
			<tr onClick={onToggle} style={{ cursor: 'pointer' }}>
				<td>
					<Text size='xs' color='dimmed'>
						{expanded ? '▼' : '▶'}
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
						{/* FIX: Changed gap back to spacing and wrap back to noWrap for v6 */}
						<Group spacing={4} noWrap={false}>
							{story.categories.map((c) => (
								<Badge key={c.categoryId} size='sm' variant='outline'>
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
						<Badge color={story.published ? 'green' : 'gray'} variant='filled' size='sm'>
							{story.published ? 'Yes' : 'No'}
						</Badge>
					</td>
				)}
				{visibleColumns.reviewed && (
					<td>
						<Badge color={reviewStatus.color}>{reviewStatus.label}</Badge>
					</td>
				)}
				{visibleColumns.createdAt && <td>{DateTime.fromJSDate(story.createdAt).toFormat('M/d/yyyy')} </td>}
				{visibleColumns.updatedAt && <td>{DateTime.fromJSDate(story.updatedAt).toFormat('M/d/yyyy')} </td>}
			</tr>

			{expanded && (
				<tr>
					<td colSpan={totalColumns}>
						<Grid p='md'>
							<Grid.Col span={6}>
								<Text weight={700} size='sm'>
									Response 1 (English)
								</Text>
								<Text size='sm'>{story.response1EN || 'N/A'}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size='sm'>
									Response 2 (English)
								</Text>
								<Text size='sm'>{story.response2EN || 'N/A'}</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size='sm'>
									Response 1 (Spanish)
								</Text>
								<Text size='sm'>
									{story.response1ES
										? story.response1ES
										: isLoadingPreview
											? 'Loading from Crowdin...'
											: previewData?.crowdin?.es?.response1 || 'N/A'}
								</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size='sm'>
									Response 1 (French)
								</Text>
								<Text size='sm'>
									{story.response1FR
										? story.response1FR
										: isLoadingPreview
											? 'Loading from Crowdin...'
											: previewData?.crowdin?.fr?.response1 || 'N/A'}
								</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size='sm'>
									Response 2 (Spanish)
								</Text>
								<Text size='sm'>
									{story.response2ES
										? story.response2ES
										: isLoadingPreview
											? 'Loading from Crowdin...'
											: previewData?.crowdin?.es?.response2 || 'N/A'}
								</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text weight={700} size='sm'>
									Response 2 (French)
								</Text>
								<Text size='sm'>
									{story.response2FR
										? story.response2FR
										: isLoadingPreview
											? 'Loading from Crowdin...'
											: previewData?.crowdin?.fr?.response2 || 'N/A'}
								</Text>
							</Grid.Col>
							<Grid.Col span={12}>
								{/* FIX: Changed justify back to position for v6 */}
								<Group position='apart'>
									<Text size='xs' color='dimmed' style={{ fontFamily: 'monospace' }}>
										DB: published: {String(story.published)}, textToxicity: {story.textToxicity ?? 'null'}
									</Text>
									<Group position='right'>
										{!story.published && (
											<Tooltip label='Approve & Publish'>
												<ActionIcon color='green' variant='filled' size='lg' onClick={onApprove}>
													<IconCheck size='1.2rem' />
												</ActionIcon>
											</Tooltip>
										)}
										{(story.published || story.textToxicity === 1.0) && (
											<Tooltip label='Restore to Pending'>
												<ActionIcon color='gray' variant='filled' size='lg' onClick={onUnpublish}>
													<IconRotateClockwise size='1.2rem' />
												</ActionIcon>
											</Tooltip>
										)}
										{story.textToxicity !== 1.0 && (
											<Tooltip label='Reject'>
												<ActionIcon color='red' variant='filled' size='lg' onClick={onReject}>
													<IconX size='1.2rem' />
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
