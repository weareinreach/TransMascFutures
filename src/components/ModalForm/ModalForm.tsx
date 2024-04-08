import {
	Button,
	FileInput,
	Group,
	Modal,
	Select,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useRef, useState } from "react";

export const ModalForm = () => {
	const [opened, setOpened] = useState(false);
	const imageInput = useRef(null);
	const isMobile = useMediaQuery("(max-width: 1000px)");

	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			storyJoy: "",
			keyJoy: "",
			storyAccess: "",
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			storyJoy: (value) =>
				value.length > 0 ? null : "Joy field can't be blank",
			keyJoy: (value) => (value.length > 0 ? null : "Please choose a category"),
			storyAccess: (value) =>
				value.length > 0 ? null : "Access field can't be blank",
		},
	});

	const submitStory = () => {
		// Implement when trpc entrypoints are ready

		// Remember to check for imageInput.files[0] in case a user submits an image

		form.validate();
		console.log(form.values);
	};

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Participate today!"
				fullScreen={isMobile}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						submitStory();
					}}
				>
					<TextInput label="Name" {...form.getInputProps("name")} />
					<TextInput
						label="Email"
						withAsterisk
						{...form.getInputProps("email")}
					/>
					<TextInput
						label="Joy"
						withAsterisk
						{...form.getInputProps("storyJoy")}
					/>
					<TextInput
						label="Access"
						withAsterisk
						{...form.getInputProps("storyAccess")}
					/>
					<Select
						label="Category"
						withAsterisk
						placeholder="Pick one"
						data={[
							{ value: "queer", label: "Queer" },
							{ value: "bipoc", label: "BIPOC" },
							{ value: "disabled", label: "Disabled" },
						]}
						{...form.getInputProps("keyJoy")}
					/>
					<FileInput
						ref={imageInput}
						/*placeholder='Pick an image'*/ label="Image"
						withAsterisk
					/>

					<Group justify="right" mt="md">
						<Button type="submit">{"Submit"}</Button>
					</Group>
				</form>
			</Modal>

			<Group justify="center">
				<Button variant="secondary" onClick={() => setOpened(true)}>
					{"CLICK HERE TO PARTICIPATE"}
				</Button>
			</Group>
		</>
	);
};
