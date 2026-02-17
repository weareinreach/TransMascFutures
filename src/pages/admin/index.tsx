/* eslint-disable i18next/no-literal-string */
import {
	Button,
	Center,
	Checkbox,
	Container,
	createStyles,
	Group,
	Menu,
	Pagination,
	ScrollArea,
	Stack,
	Table,
	Text,
	Title,
} from '@mantine/core'
import { IconColumns } from '@tabler/icons-react'
import { type GetStaticProps, type NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'

import { SortableTh } from '~/components/Admin/SortableTh'
import { StatusLegend } from '~/components/Admin/StatusLegend'
import { StoryRow } from '~/components/Admin/StoryRow'
import { mockStories } from '~/data/mockStories'
import { getServerSideTranslations } from '~/server/i18n'
import { api, type RouterOutputs } from '~/utils/api'

const useStyles = createStyles((theme) => ({
	header: {
		marginBottom: theme.spacing.lg,
	},
}))

type Story = RouterOutputs['admin']['getStories'][number]

const AdminPage: NextPage = () => {
	const { classes } = useStyles()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { t } = useTranslation()
	const [page, setPage] = useState(1)
	const [sortBy, setSortBy] = useState<{ key: keyof Story | 'reviewed' | 'category'; direction: 'asc' | 'desc' } | null>(null)
	const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null)
	const [visibleColumns, setVisibleColumns] = useState({
		id: false,
		name: true,
		categories: true,
		response1EN: true,
		response2EN: true,
		published: true,
		reviewed: true,
	})
	const ITEMS_PER_PAGE = 10

	const utils = api.useContext()
	const { data: apiStories, isLoading } = api.admin.getStories.useQuery()

	// Single item actions wrapper
	const approveStory = api.admin.approveStory.useMutation({
		onSuccess: () => {
			void utils.admin.getStories.invalidate()
		},
	})
	const rejectStory = api.admin.rejectStory.useMutation({
		onSuccess: () => {
			void utils.admin.getStories.invalidate()
		},
	})
	const unpublishStory = api.admin.unpublishStory.useMutation({
		onSuccess: () => {
			void utils.admin.getStories.invalidate()
		},
	})

	const allStories = apiStories && apiStories.length > 0 ? apiStories : mockStories

	const getReviewStatusValue = (story: Story) => {
		if (story.published) return 3 // Published
		if (story.textToxicity === 1.0) return 2 // Rejected
		if (story.textToxicity === 0) return 1 // Unpublished
		return 0 // Not Reviewed
	}

	const sortedStories = useMemo(() => {
		const filtered = [...allStories]
		if (sortBy) {
			filtered.sort((a, b) => {
				const { key, direction } = sortBy
				const dir = direction === 'asc' ? 1 : -1

				if (key === 'reviewed') {
					return (getReviewStatusValue(a) - getReviewStatusValue(b)) * dir
				}
				if (key === 'published') {
					return (Number(a.published) - Number(b.published)) * dir
				}
				if (key === 'category') {
					const catA = a.categories?.[0]?.category?.tag || ''
					const catB = b.categories?.[0]?.category?.tag || ''
					return catA.localeCompare(catB) * dir
				}
				if (key === 'id' || key === 'name' || key === 'response1EN' || key === 'response2EN') {
					const valA = a[key] || ''
					const valB = b[key] || ''
					if (typeof valA === 'string' && typeof valB === 'string') {
						return valA.localeCompare(valB) * dir
					}
				}
				return 0
			})
		}

		return filtered
	}, [allStories, sortBy])

	const paginatedStories = sortedStories.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
	const totalPages = Math.ceil(sortedStories.length / ITEMS_PER_PAGE)

	useEffect(() => {
		setPage(1)
	}, [sortBy])

	const setSorting = (key: keyof Story | 'reviewed' | 'category') => {
		if (sortBy?.key === key) {
			setSortBy({ key, direction: sortBy.direction === 'asc' ? 'desc' : 'asc' })
		} else {
			setSortBy({ key, direction: 'asc' })
		}
	}

	return (
		<Container py="xl">
			<Stack align="center" spacing="lg" mt={50} className={classes.header}>
				<Title order={1}>Admin Portal</Title>
				<Text>Welcome to the TransMascFutures admin area.</Text>
			</Stack>

			<StatusLegend />

			<Stack spacing="xs" mb="md">
				<Text size="sm">
					<strong>Question 1:</strong> {t('story.prompt1')}
				</Text>
				<Text size="sm">
					<strong>Question 2:</strong> {t('story.prompt2')}
				</Text>
			</Stack>

						<Group position="right" mb="md" align="flex-end">
				<Menu shadow="md" width={200} closeOnItemClick={false}>
					<Menu.Target>
						<Button leftIcon={<IconColumns size="1rem" />} variant="outline">
							Columns
						</Button>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>Visible Columns</Menu.Label>
						{Object.entries({
							id: 'ID',
							name: 'Name',
							categories: 'Categories',
							response1EN: 'Resp 1 (EN)',
							response2EN: 'Resp 2 (EN)',
							published: 'Published',
							reviewed: 'Reviewed',
						}).map(([key, label]) => (
							<Menu.Item key={key}>
								<Checkbox
									label={label}
									checked={visibleColumns[key as keyof typeof visibleColumns]}
									onChange={(event) => setVisibleColumns((current) => ({ ...current, [key]: event.currentTarget.checked }))}
								/>
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			</Group>

			{isLoading && !allStories.length ? (
				<Text align="center">Loading...</Text>
			) : (
				<ScrollArea>
					<Table striped highlightOnHover withBorder withColumnBorders>
						<thead>
							<tr>
								<th style={{ width: 40, padding: '0 !important' }}></th>
								{visibleColumns.id && <SortableTh>ID</SortableTh>}
								{visibleColumns.name && <SortableTh>Name</SortableTh>}
								{visibleColumns.categories && (
									<SortableTh sorted={sortBy?.key === 'category'} reversed={sortBy?.direction === 'desc'} onSort={() => setSorting('category')}>
										Categories
									</SortableTh>
								)}
								{visibleColumns.response1EN && <SortableTh>Response 1</SortableTh>}
								{visibleColumns.response2EN && <SortableTh>Response 2</SortableTh>}
								{visibleColumns.published && (
									<SortableTh
										sorted={sortBy?.key === 'published'}
										reversed={sortBy?.direction === 'desc'}
										onSort={() => setSorting('published')}
									>
										Published
									</SortableTh>
								)}
								{visibleColumns.reviewed && (
									<SortableTh sorted={sortBy?.key === 'reviewed'} reversed={sortBy?.direction === 'desc'} onSort={() => setSorting('reviewed')}>
										Reviewed
									</SortableTh>
								)}
							</tr>
						</thead>
						<tbody>
							{paginatedStories.map((story) => (
								<StoryRow
									key={story.id}
									story={story}
									expanded={expandedStoryId === story.id}
									onToggle={() => setExpandedStoryId((curr) => (curr === story.id ? null : story.id))}
									onApprove={() => approveStory.mutate({ id: story.id })}
									onReject={() => rejectStory.mutate({ id: story.id, reason: 1.0 })}
									onUnpublish={() => unpublishStory.mutate({ id: story.id })}
									visibleColumns={visibleColumns}
								/>
							))}
						</tbody>
					</Table>

					<Center mt="xl">
						<Pagination total={totalPages} value={page} onChange={setPage} />
					</Center>
				</ScrollArea>
			)}
		</Container>
	)
}

export default AdminPage

export const getStaticProps: GetStaticProps = async ({ locale: ssrLocale }) => {
	const locale = (['en', 'es', 'fr'].includes(ssrLocale ?? '') ? ssrLocale : 'en') as 'en' | 'es' | 'fr'

	return {
		props: {
			...(await getServerSideTranslations(locale, ['common'])),
		},
	}
}
