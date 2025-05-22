 SELECT "StorySubmission".id,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q1'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q1'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q1'::text
        END AS q1,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q2'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q2'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q2'::text
        END AS q2,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q3'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q3'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q3'::text
        END AS q3,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q4'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q4'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q4'::text
        END AS q4,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q5'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q5'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q5'::text
        END AS q5,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q6'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q6'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q6'::text
        END AS q6,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q7'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q7'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q7'::text
        END AS q7,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q8'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q8'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q8'::text
        END AS q8,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q9'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q9'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q9'::text
        END AS q9,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q10'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q10'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q10'::text
        END AS q10,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q11'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q11'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q11'::text
        END AS q11,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q12'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q12'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q12'::text
        END AS q12,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q13'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q13'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q13'::text
        END AS q13,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q14'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q14'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q14'::text
        END AS q14,
        CASE
            WHEN jsonb_typeof("StorySubmission".responses -> 'q15'::text) = 'array'::text THEN ( SELECT string_agg(elem.value, ', '::text) AS string_agg
               FROM jsonb_array_elements_text("StorySubmission".responses -> 'q15'::text) elem(value))
            ELSE "StorySubmission".responses ->> 'q15'::text
        END AS q15
   FROM "StorySubmission";
