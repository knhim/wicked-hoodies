--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
237	88	2	2595
238	88	1	2999
239	88	4	999
240	88	2	2595
241	88	2	2595
242	89	2	2595
243	89	1	2999
244	89	3	2900
245	90	3	2900
246	90	1	2999
247	90	5	9900
248	91	1	2999
249	92	2	2595
250	93	4	999
251	94	1	2999
252	95	1	2999
253	96	1	2999
254	96	1	2999
255	96	2	2595
256	96	3	2900
257	96	2	2595
258	97	3	2900
259	98	1	2999
260	99	2	2595
261	99	1	2999
262	99	2	2595
263	98	3	2900
264	98	3	2900
265	100	2	2595
266	101	2	2595
267	102	2	2595
268	102	2	2595
269	103	2	2595
270	103	1	2999
271	103	6	830
272	104	1	2999
273	105	2	2595
274	106	1	2999
275	106	5	9900
276	107	5	9900
277	108	2	2595
278	109	1	2999
279	110	1	2999
280	110	2	2595
281	111	1	2999
282	111	2	2595
283	112	1	2999
284	112	2	2595
285	113	1	5999
286	113	1	5999
287	114	1	5999
288	114	3	5499
289	115	3	5499
290	115	2	5999
291	116	3	5499
292	116	4	5499
293	117	2	5999
294	117	1	5999
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
88	2021-01-28 14:52:00.07234-08
89	2021-01-28 22:21:55.737369-08
90	2021-01-30 02:02:40.069686-08
91	2021-01-31 09:21:00.205747-08
92	2021-01-31 10:24:55.740474-08
93	2021-01-31 10:26:15.271314-08
94	2021-02-02 07:08:09.170466-08
95	2021-02-02 07:19:58.277733-08
96	2021-02-02 07:22:21.634319-08
97	2021-02-02 07:36:15.519526-08
98	2021-02-02 08:36:16.577321-08
99	2021-02-02 08:41:05.736227-08
100	2021-02-02 09:22:16.869412-08
101	2021-02-02 09:23:13.48521-08
102	2021-02-02 09:37:38.732317-08
103	2021-02-02 09:58:10.298882-08
104	2021-02-02 09:59:35.492844-08
105	2021-02-02 10:00:04.779003-08
106	2021-02-02 10:00:23.914216-08
107	2021-02-02 10:02:37.655662-08
108	2021-02-02 11:22:13.263429-08
109	2021-02-02 16:49:42.812677-08
110	2021-02-02 17:08:59.384011-08
111	2021-02-04 04:57:44.415445-08
112	2021-02-04 06:13:10.561719-08
113	2021-02-05 10:47:02.588473-08
114	2021-02-05 11:03:24.867309-08
115	2021-02-05 11:52:30.420178-08
116	2021-02-05 11:56:29.038512-08
117	2021-02-05 11:57:29.648888-08
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	91	kevin	1234	1234 dream lane	2021-01-31 09:29:22.523227-08
2	91	kevin	1234	1234 dream lane	2021-01-31 09:33:09.35925-08
3	91	kevin	1234	1234 dream lane	2021-01-31 09:34:29.005938-08
4	91	kevin	1234	1234 dream lane	2021-01-31 09:35:41.773582-08
5	91	kdog	1234	house on a hill	2021-01-31 09:40:37.837417-08
6	91	kdog	1234	house on a hill	2021-01-31 09:42:13.939293-08
7	91	kdog	1234	house on a	2021-01-31 09:45:14.147645-08
8	91	kdog	1234	house	2021-01-31 09:46:29.136372-08
9	91	kdog	1234	house	2021-01-31 09:55:42.9905-08
10	91	kdog	1234	learningfuze	2021-01-31 10:00:52.482091-08
11	91	kevin	4040	learningfuze!	2021-01-31 10:01:26.264814-08
12	91	kevin	4040	learningfuze!	2021-01-31 10:02:13.290513-08
13	91	kevin	4040	learningfuze!	2021-01-31 10:03:24.878419-08
14	91	kevin	4040	learningfuze!	2021-01-31 10:04:09.099442-08
15	91	kevin	4040	learningfuze!	2021-01-31 10:05:33.626826-08
16	91	kevin	4040	learningfuze!	2021-01-31 10:18:00.766114-08
17	91	kevin	4040	learningfuze!	2021-01-31 10:21:07.816498-08
18	91	kevin	4040	learningfuze!	2021-01-31 10:22:00.32576-08
19	91	kevin	4040	learningfuze!	2021-01-31 10:24:05.51493-08
21	92	kevin	4040	learningfuze irvine california	2021-01-31 10:25:10.62817-08
24	93	Kevin	123454321	1234 dream lane	2021-01-31 10:28:07.609634-08
26	94	kevin nhim	1234	123 learningfuze	2021-02-02 07:08:12.648427-08
27	95	Kevin	1	testing avenue	2021-02-02 07:20:58.504168-08
29	96	kevin nhim	123321	1234 lfz avenue	2021-02-02 07:33:59.652673-08
30	97	kevin	1234	1342 lfz boulevard	2021-02-02 07:36:26.97317-08
31	99	kevin	1234	1234 test	2021-02-02 08:42:58.876187-08
34	98				2021-02-02 09:20:48.741907-08
35	100				2021-02-02 09:22:25.104291-08
36	100				2021-02-02 09:22:51.760904-08
37	101				2021-02-02 09:23:16.644002-08
38	101				2021-02-02 09:36:56.348591-08
41	102	kevin	1234	1234 lfz lane	2021-02-02 09:57:28.802208-08
42	103	Kevin Nhim	4321 1234	testing this out	2021-02-02 09:59:07.501857-08
43	104	bleh	9871	lane kingdom	2021-02-02 09:59:48.149581-08
44	105	123	1234	123	2021-02-02 10:00:10.652788-08
45	106	kevin	1234 4321	testing	2021-02-02 10:00:59.071872-08
46	107	testing	1234	please work god please	2021-02-02 10:02:48.699269-08
48	108	kevin	1234	1234 lfz drive	2021-02-02 11:22:18.6296-08
50	109	kevin nhim	1234-4321-1234	1234 lfz lane	2021-02-02 17:08:28.123442-08
51	111	kevin	1234-4321-1234	1234 test avenue	2021-02-04 06:11:45.172692-08
52	113	kevin	1234	1234 LFZ Lane	2021-02-05 11:03:15.54392-08
53	114				2021-02-05 11:51:42.599375-08
54	115				2021-02-05 11:55:17.106104-08
55	116				2021-02-05 11:57:09.75544-08
56	117	Kevin	1234-4321-12345	1234 LFZ Avenue	2021-02-05 11:57:50.279017-08
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	CHAMPION Reverse Weave Mens Dark Pink Hoodie	5999	/images/champion-reverse-weave-mens-dark-pink-hoodie.jpg	Champion Reverse Weave Hoodie.	Champion Reverse Weave Hoodie. The classic Reverse Weave® Pullover Hoodie only gets better with time. It's specially knit to resist vertical shrinkage, so the length stays true to size. Features embroidered Champion logo on front left chest and bottom left sleeve. Fleece lining. Two-ply hood with working drawcord for extra coverage. Pouch pocket with bartacks for strength and durability. Stretch ribbed side panels add ease and mobility. Cuffed long sleeves. Ribbed hemline. 82% cotton/18% polyester. Machine wash. Imported.
2	CHAMPION Reverse Weave Mens Blue Hoodie	5999	/images/champion-reverse-weave-mens-blue-hoodie.jpg	Champion Reverse Weave Hoodie.	Champion Reverse Weave Hoodie. The classic Reverse Weave® Pullover Hoodie only gets better with time. It's specially knit to resist vertical shrinkage, so the length stays true to size. Features embroidered Champion logo on front left chest and bottom left sleeve. Fleece lining. Two-ply hood with working drawcord for extra coverage. Pouch pocket with bartacks for strength and durability. Stretch ribbed side panels add ease and mobility. Cuffed long sleeves. Ribbed hemline. 82% cotton/18% polyester. Machine wash. Imported.
3	Nike SB Icon Essential Hoodie	5499	/images/nike-sb-icon-essential-mens-hoodie.jpg	Nike SB Icon Essential Hoodie	Nike SB Icon Essential Hoodie. The Nike SB Icon Hoodie keeps you warm on and off your board thanks to soft fleece and an adjustable hood. Midweight fleece is brushed for superior warmth and softness. Drawcord lets you wear the hood loose or cinch out the cold. Ribbed cuffs and hem help keep the hoodie in place while you move. Front kangaroo pocket. 80% cotton/20% polyester. Machine wash. Imported.
4	THE NORTH FACE Box NSE Mens Mint Hoodie	5499	/images/north-face-box-mens-mint-hoodie.jpg	The North Face Box NSE hoodie.	The North Face Box NSE hoodie. Features The North Face logo at left chest and box logo screened on the back. Fleece lining. Drawstring hood. Kangaroo pocket. Ribbed cuffs and hem. 69% cotton/31% polyester. Machine wash. Imported.
5	Brixton Crest Mens Black & Blue Hoodie	5899	/images/brixton-crest-mens-black-and-blue-hoodie.jpg	Brixton Crest Hoodie	Brixton Crest Hoodie. Drawstring hood. Brixton crest screened at left chest. Ribbed cuffs and hem. Kangaroo pocket. Fleece lining. 80% cotton/20% polyester. Machine wash. Imported.
6	BLUE CROWN Road Trip Mens Hoodie	3999	/images/blue-crown-road-trip-mens-hoodie.jpg	Black Crown Road Trip Hoodie.	Black Crown Road Trip Hoodie. Drawstring hood. Graphic screened at center front. Ribbed cuffs and hem. Kangaroo pocket. Fleece lining. 80% cotton/20% polyester. Machine wash. Imported.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 294, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 117, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 56, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

