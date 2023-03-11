/* create new data types */
CREATE EXTENSION citext;
CREATE DOMAIN public.email AS citext
	COLLATE "default"
	CONSTRAINT email_check CHECK ( value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

CREATE TYPE activity_type AS ENUM ('ACTIVE','INACTIVE','DELETED');
CREATE TYPE task_status AS ENUM ('NEW','WORKING', 'COMPLETED', 'DELETED');


/* users table */
CREATE TABLE public."user" (
	id serial NOT NULL PRIMARY KEY,
	username varchar(50) NOT NULL,
	email public.email NOT NULL,
	fullname varchar(256) NOT NULL,
	active public.activity_type NOT NULL DEFAULT 'ACTIVE',
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	last_logon timestamp NULL
);
CREATE UNIQUE INDEX user_username_idx ON public."user" (username);
CREATE UNIQUE INDEX user_email_idx ON public."user" (email);
CREATE INDEX user_active_idx ON public."user" (active);


INSERT INTO public."user" (username, email, fullname, active)
VALUES('s.pozdnyakov', 's.pozdnyakov@ase-ec.ru', 'Поздняков Сергей', 'ACTIVE');


/* projects table */
CREATE TABLE public.project (
	id serial NOT NULL,
	parent_id integer NULL,
	"name" varchar(128) NOT NULL,
	code varchar(5) NOT NULL,
	deletion_date timestamp NULL,
	CONSTRAINT project_pk PRIMARY KEY (id)
);
ALTER TABLE public.project ADD CONSTRAINT project_fk FOREIGN KEY (parent_id) REFERENCES public.project(id) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO public.project (parent_id, "name", code)
VALUES(null, 'HW_3_SQL', 'HW3');


/* tasks table */
CREATE TABLE public.task (
	id serial NOT NULL,
	parent_id integer NULL,
	task_status public.task_status NOT NULL DEFAULT 'NEW',
	"name" varchar(512) NOT NULL,
	project_id integer NOT NULL,
	creator_id integer NOT NULL,
	start_at date NULL,
	due_date date NULL,
	actual_finish_date date NULL,
	actual_labor decimal(15, 2) NOT NULL DEFAULT 0,
	description text NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deletion_date timestamp NULL,
	CONSTRAINT task_pk PRIMARY KEY (id),
	CONSTRAINT task_fk_p FOREIGN KEY (project_id) REFERENCES public.project(id) ON DELETE CASCADE ON UPDATE SET NULL,
	CONSTRAINT task_fk_u FOREIGN KEY (creator_id) REFERENCES public."user"(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX task_due_date_idx ON public.task (due_date);
CREATE INDEX task_actual_finish_date_idx ON public.task (actual_finish_date);
CREATE INDEX task_task_status_idx ON public.task (task_status);

INSERT INTO public.task
  (parent_id, task_status, "name", project_id, creator_id, start_at, due_date, actual_finish_date, actual_labor, description)
VALUES(null, 'NEW'::task_status, 'Задание SQL HW3', 1, 1, null, '2023-03-11', null, 0, 'Выполняю задание JavaScriptFullStack Developer');


/* tasks assigned table */
CREATE TABLE public.task_assign (
	id serial NOT NULL,
	task_id integer NOT NULL,
	user_id integer NOT NULL,
	assigned_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT task_assign_pk PRIMARY KEY (id),
	CONSTRAINT task_assign_fk_u FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT task_assign_fk_t FOREIGN KEY (task_id) REFERENCES public.task(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO public.task_assign (task_id, user_id)
VALUES(1, 1);


/* tasks comments table */
CREATE TABLE public.task_comment (
	id serial NOT NULL,
	task_id integer NOT NULL,
	user_id integer NOT NULL,
	"comment" text NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT task_comment_pk PRIMARY KEY (id),
	CONSTRAINT task_comment_fk_t FOREIGN KEY (task_id) REFERENCES public.task(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT task_comment_fk_u FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO public.task_comment (task_id, user_id, "comment")
VALUES(1, 1, 'Первый ***!!!');


/* tasks attachments table */
CREATE TABLE public.task_attachment (
	id serial NOT NULL,
	task_id integer NOT NULL,
	filename varchar(128) NULL,
	filepath varchar(512) NOT NULL,
	upload_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT task_attachment_pk PRIMARY KEY (id),
	CONSTRAINT task_attachment_fk FOREIGN KEY (task_id) REFERENCES public.task(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO public.task_attachment (task_id, filename, filepath)
VALUES(1, 'cat,jpg', 'ftp://@myftphost/foo/cat.jpg');


