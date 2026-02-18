/* eslint-disable i18next/no-literal-string */
import {
	Button,
	Checkbox,
	Container,
	createStyles,
	Group,
	Menu,
	Pagination,
	Paper,
	PasswordInput,
	ScrollArea,
	Stack,
	Table,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { IconColumns } from '@tabler/icons-react'
import { type GetStaticProps, type NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import { SortableTh } from '~/components/Admin/SortableTh'
import { StatusLegend } from '~/components/Admin/StatusLegend'
import { StoryRow } from '~/components/Admin/StoryRow'
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
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isAuthChecking, setIsAuthChecking] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')
	const [page, setPage] = useState(1)
	const [sortBy, setSortBy] = useState<{
		key: keyof Story | 'reviewed' | 'category'
		direction: 'asc' | 'desc'
	} | null>(null)
	const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null)
	const [visibleColumns, setVisibleColumns] = useState({
		id: false,
		name: true,
		categories: true,
		response1EN: true,
		response2EN: true,
		published: true,
		reviewed: true,
		createdAt: false,
		updatedAt: false,
	})
	const ITEMS_PER_PAGE = 10

	const utils = api.useUtils()
	const { data: apiStories, isLoading } = api.admin.getStories.useQuery()

	useEffect(() => {
		const auth = localStorage.getItem('tmf_admin_auth')
		if (auth === 'true') {
			setIsAuthenticated(true)
		}
		setIsAuthChecking(false)
	}, [])

	const loginMutation = api.admin.login.useMutation({
		onSuccess: (success) => {
			if (success) {
				setIsAuthenticated(true)
				setLoginError('')
				localStorage.setItem('tmf_admin_auth', 'true')
			} else {
				setLoginError('Invalid email or password')
			}
		},
	})

	// Single item actions wrapper
	const approveStory = api.admin.approveStory.useMutation({
		onSuccess: (data) => {
			setExpandedStoryId(null)
			utils.admin.getStories.setData(undefined, (old) => old?.map((s) => (s.id === data.id ? data : s)))
		},
	})
	const rejectStory = api.admin.rejectStory.useMutation({
		onSuccess: (data) => {
			setExpandedStoryId(null)
			utils.admin.getStories.setData(undefined, (old) => old?.map((s) => (s.id === data.id ? data : s)))
		},
	})
	const unpublishStory = api.admin.unpublishStory.useMutation({
		onSuccess: (data) => {
			setExpandedStoryId(null)
			utils.admin.getStories.setData(undefined, (old) => old?.map((s) => (s.id === data.id ? data : s)))
		},
	})

	const getReviewStatusValue = (story: Story) => {
		if (story.published) return 3 // Published
		if (story.textToxicity === 1.0) return 2 // Rejected
		if (story.textToxicity === 0) return 1 // Unpublished
		return 0 // Not Reviewed
	}

	const allStories = apiStories || []
	const sortedStories = [...allStories]
	if (sortBy) {
		sortedStories.sort((a, b) => {
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
			if (
				key === 'id' ||
				key === 'name' ||
				key === 'response1EN' ||
				key === 'response2EN' ||
				key === 'createdAt' ||
				key === 'updatedAt'
			) {
				const valA = a[key] || ''
				const valB = b[key] || ''
				if (typeof valA === 'string' && typeof valB === 'string') {
					return valA.localeCompare(valB) * dir
				}
			}
			return 0
		})
	}

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

	if (isAuthChecking) return null

	if (!isAuthenticated) {
		return (
			<Container size='xs' py={100}>
				<Paper withBorder shadow='md' p={30} radius='md' mt='xl'>
					<Title order={2} align='center' mb='lg'>
						Admin Login
					</Title>
					<TextInput
						label='Email'
						placeholder='you@example.com'
						required
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
					<PasswordInput
						label='Password'
						placeholder='Your password'
						required
						mt='md'
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
					{loginError && (
						<Text color='red' size='sm' mt='sm'>
							{loginError}
						</Text>
					)}
					<Button
						fullWidth
						mt='xl'
						onClick={() => loginMutation.mutate({ email, password })}
						loading={loginMutation.isLoading}
					>
						Sign in
					</Button>
				</Paper>
			</Container>
		)
	}

	return (
		<Container py='xl'>
			<Group position='right'>
				<Button
					variant='outline'
					color='red'
					size='xs'
					onClick={() => {
						localStorage.removeItem('tmf_admin_auth')
						setIsAuthenticated(false)
					}}
				>
					Logout
				</Button>
			</Group>
			<Stack align='center' spacing='lg' mt={20} className={classes.header}>
				<Title order={1}>Admin Portal</Title>
				<Text>Welcome to the TransMascFutures admin area.</Text>
			</Stack>

			<StatusLegend />

			<Stack spacing='xs' mb='md'>
				<Text size='sm'>
					<strong>Question 1:</strong> {t('story.prompt1')}
				</Text>
				<Text size='sm'>
					<strong>Question 2:</strong> {t('story.prompt2')}
				</Text>
			</Stack>

			<Group position='right' mb='md' align='flex-end'>
				<Menu shadow='md' width={200} closeOnItemClick={false}>
					<Menu.Target>
						<Button leftIcon={<IconColumns size='1rem' />} variant='outline'>
							Columns
						</Button>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>Visible Columns</Menu.Label>
						{Object.entries({
							id: 'ID',
							name: 'Name',
							categories: 'Categories',
							response1EN: 'Response 1',
							response2EN: 'Response 2',
							published: 'Published',
							reviewed: 'Reviewed',
							createdAt: 'Created',
							updatedAt: 'Updated',
						}).map(([key, label]) => (
							<Menu.Item key={key}>
								<Checkbox
									label={label}
									checked={visibleColumns[key as keyof typeof visibleColumns]}
									onChange={(event) =>
										setVisibleColumns((current) => ({ ...current, [key]: event.currentTarget.checked }))
									}
								/>
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			</Group>

			{isLoading && !allStories.length ? (
				<Text align='center'>Loading...</Text>
			) : (
				<ScrollArea>
					<Table striped highlightOnHover withBorder withColumnBorders>
						<thead>
							<tr>
								<th style={{ width: 40, padding: '0 !important' }}></th>
								{visibleColumns.id && <SortableTh>ID</SortableTh>}
								{visibleColumns.name && <SortableTh>Name</SortableTh>}
								{visibleColumns.categories && (
									<SortableTh
										sorted={sortBy?.key === 'category'}
										reversed={sortBy?.direction === 'desc'}
										onSort={() => setSorting('category')}
									>
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
									<SortableTh
										sorted={sortBy?.key === 'reviewed'}
										reversed={sortBy?.direction === 'desc'}
										onSort={() => setSorting('reviewed')}
									>
										Reviewed
									</SortableTh>
								)}
								{visibleColumns.createdAt && (
									<SortableTh
										sorted={sortBy?.key === 'createdAt'}
										reversed={sortBy?.direction === 'desc'}
										onSort={() => setSorting('createdAt')}
									>
										Created
									</SortableTh>
								)}
								{visibleColumns.updatedAt && (
									<SortableTh
										sorted={sortBy?.key === 'updatedAt'}
										reversed={sortBy?.direction === 'desc'}
										onSort={() => setSorting('updatedAt')}
									>
										Updated
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

					<Group position='apart' mt='xl' align='center'>
						<Text size='sm' color='dimmed'>
							Showing {sortedStories.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1} to{' '}
							{Math.min(page * ITEMS_PER_PAGE, sortedStories.length)} of {sortedStories.length} entries
						</Text>
						<Pagination total={totalPages} value={page} onChange={setPage} />
					</Group>
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
