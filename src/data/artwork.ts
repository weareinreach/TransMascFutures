import { type StaticImageData } from "next/image";
import slugify from "slugify";
import { type LiteralUnion } from "type-fest";

import alexandercj from "~public/artwork/alexandercj.png";
import chava from "~public/artwork/chava.webp";
import daxe from "~public/artwork/daxe.png";
import elih from "~public/artwork/elih.jpg";
import leonardo1 from "~public/artwork/leonardo1.png";
import leonardo2 from "~public/artwork/leonardo2.png";
import leonardo3 from "~public/artwork/leonardo3.png";
import leonardo4 from "~public/artwork/leonardo4.png";
import scottw from "~public/artwork/scottw.png";

export const artwork = {
	alexandercj,
	chava,
	daxe,
	elih,
	leonardo1,
	leonardo2,
	leonardo3,
	leonardo4,
	scottw,
};

export const isValidArtwork = (art: unknown): art is keyof typeof artwork =>
	typeof art === "string" && Object.hasOwn(artwork, art);

export const getArtwork = (art: LiteralUnion<keyof typeof artwork, string>) =>
	isValidArtwork(art) ? artwork[art] : undefined;

export interface ArtData {
	artist: string;
	descriptionEN?: string;
	descriptionES?: string;
	altEN: string;
	altES: string;
	src: StaticImageData | StaticImageData[];
	slug: string;
}

const slug = (artist: string) => slugify(artist, { lower: true, strict: true });

export const artData: ArtData[] = [
	{
		artist: "Daxe",
		slug: slug("Daxe"),
		descriptionEN:
			"Gender expression is as infinite and as beautiful as the cosmos. We are all beings made up of recycled stardust, never be ashamed to shine your brightest!",
		descriptionES:
			"La expresión de género es tan infinita y hermosa como el cosmos. Todes somos seres formados por polvo de estrellas reciclado, ¡nunca te avergüences de brillar al máximo!",
		altEN:
			"An ethereal blue transmasculine person floating in space in the center of the image with arms outstretched to their sides. A syringe is floating just above their left hand, a bottle of testosterone is floating above their right hand and a trail of the liquid content floats in an arc between them. In the background there is a a wavy streak of color matching the trans pride flag color among the stars, a sun shining cyan light from above, a pink moon reflecting light below, and a blue planet with white clouds and a pink atmosphere at the bottom of the image beneath the subject.",
		altES:
			"Una persona azul trans masculina flotando en el espacio en el centro de la imagen con sus brazos extendidos a los lados. Una jeringa flota justo sobre su mano izquierda, una botella de testosterona flota sobre su mano derecha y un rastro del contenido líquido flota en un arco en medio de ellos. En el fondo hay una raya ondulada de color que combina con el color de la bandera del orgullo trans entre las estrellas, un sol brillando con luz cian desde arriba, una luna rosada que refleja la luz debajo y un planeta azul con nubes blancas y una atmósfera rosada en la parte inferior de la imagen debajo del sujeto.",
		src: artwork.daxe,
	},
	{
		artist: "Alexander C. J.",
		slug: slug("Alexander C. J."),
		altEN:
			"A fat trans man stands casually, his left hand by his side, his thumb in his jeans pocket. His right arm and part of his right side are cut off from view. He stands shirtless, dressed in a half chest binder and jeans with a belt. His face is obscured by kaleidoscope of butterflies. The butterflies and man are painted in a rainbow watercolor gradient from top to bottom with a white border. The background is a stylized transgender pride flag.",
		altES:
			"Un hombre trans gordo está de pie casualmente, su mano izquierda a su lado y el pulgar en el bolsillo de sus jeans. Su brazo derecho y parte de su costado derecho están fuera de vista. Está de pie sin camisa, vestido con la mitad de una faja de pecho y jeans con un cinturón. Su cara está oscurecida por un caleidoscopio de mariposas. Las mariposas y el hombre están pintados en un gradiente de acuarela de arcoíris de arriba a abajo con un borde blanco. El fondo es una bandera del orgullo transgénero estilizada.",
		src: artwork.alexandercj,
	},
	{
		artist: "Eli H.",
		slug: slug("Eli H."),
		descriptionEN:
			"In my day-to-day life, trans joy shows up as the moments when I am at peace with myself amongst the world. This painting is meant to depict the feeling of leaving behind the cisgender gaze when developing a relationship with yourself. Here, the armor, which is fashioned after a stereotypical chiseled man’s torso and chest, is left behind as a trans masculine figure carries on into the beauty the natural world has to offer.",
		descriptionES:
			"En mi día a día, la alegría trans aparece como los momentos en los que estoy en paz conmigo en medio del mundo. Esta pintura está destinada a representar el sentimiento de dejar atrás la mirada cis género al desarrollar una relación con uno mismo. Aquí, la armadura, que está diseñada a partir del torso y el pecho cincelado de un hombre estereotípico, se deja atrás mientras una figura trans masculina continúa hacia la belleza que el mundo natural tiene para ofrecer.",
		altEN: "",
		altES: "",
		src: artwork.elih,
	},
	{
		artist: "Scott W.",
		slug: slug("Scott W."),
		descriptionEN:
			"As above, so below. Baphomet is already a gender ambiguous symbol, and one I connect to deeply. It represents equality, intellectualism, balance, and my favorite; Individual expression. Despite Baphomet's scary appearance, I think the message and symbolism is beautiful.",
		descriptionES:
			"Como arriba, así abajo. Baphomet es ya un símbolo de género ambiguo, y con el que me conecto profundamente. Representa la igualdad, el intelectualismo, el equilibrio y mi favorito; Expresión individual. A pesar de la aparencia de Baphomet que puede generar miedo, creo que el mensaje y el simbolismo son hermosos.",
		altEN: "",
		altES: "",
		src: artwork.scottw,
	},
	{
		artist: "Chava D.",
		slug: slug("Chava D."),
		descriptionEN:
			'"Sun on Skin" is a mixed media animation that exemplifies freedom from personal restraints. Hot summers spent in compression binders are ruthless, dysphoric, and extremely taxing on all fronts- the gift and opportunity for physical deliverance is an act of resistance towards the internal/external constructs that bind. Everyone deserves the natural right to feel the sun on their skin, the warmth on their chest, and the grace of being human.',
		descriptionES:
			'"Sol en la Piel" (Sun on Skin) es una animación de medios mixtos que ejemplifica la libertad de las restricciones personales. Los calurosos veranos pasados en ataduras de compresión son despiadados, disfóricos y extremadamente exigentes en todos los frentes: el regalo y la oportunidad de la liberación física es un acto de resistencia hacia las construcciones internas/externas que pueden atar. Todes merecen el derecho natural de sentir el sol en la piel, el calor en el pecho y la gracia de ser humanos. ',
		altEN: "",
		altES: "",
		src: artwork.chava,
	},
	{
		artist: "Leonardo A.",
		slug: slug("Leonardo A."),
		descriptionEN: "",
		descriptionES: "",
		altEN: "",
		altES: "",
		src: [
			artwork.leonardo1,
			artwork.leonardo2,
			artwork.leonardo3,
			artwork.leonardo4,
		],
	},
];

export const getArtData = (slug?: string) =>
	artData.find((art) => art.slug === slug);
