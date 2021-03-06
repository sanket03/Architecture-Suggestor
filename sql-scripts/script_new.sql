USE [Azure_Architecture_Suggestion]
GO
/****** Object:  Table [dbo].[tblAzureEntities]    Script Date: 11/23/2018 7:02:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAzureEntities](
	[entity_id] [int] NOT NULL,
	[entity_name] [varchar](100) NULL,
	[group_id] [int] NULL,
	[group_name] [varchar](100) NULL,
	[architecture_id] [int] NULL,
	[architecture_name] [varchar](100) NULL,
	[parent_entities] [varchar](50) NULL,
	[entity_image_url] [nvarchar](500) NULL,
	[parent_group_id] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblQuestions]    Script Date: 11/23/2018 7:02:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblQuestions](
	[question_id] [int] NOT NULL,
	[description] [varchar](100) NULL,
	[choices] [varchar](100) NULL,
	[group_id] [int] NOT NULL,
	[architecture_id] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblQuestionToEntityMap]    Script Date: 11/23/2018 7:02:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblQuestionToEntityMap](
	[question_id] [int] NOT NULL,
	[entity_id] [int] NOT NULL,
	[option] [nvarchar](100) NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRelatedGroups]    Script Date: 11/23/2018 7:02:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRelatedGroups](
	[architecture_id] [int] NOT NULL,
	[group_id] [int] NOT NULL,
	[related_group] [int] NULL,
	[connector] [nvarchar](200) NULL
) ON [PRIMARY]

GO
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (1, N'entity1', 1, N'group 1', 1, N'architecture 1', NULL, NULL, NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (2, N'entity2', 1, N'group 1', 1, N'architecture 1', NULL, NULL, NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (3, N'entity3', 2, N'group 2', 1, N'architecture 1', N'1', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (4, N'entity4', 2, N'group 2', 1, N'architecture 1', N'2', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (5, N'entity5', 3, N'group 3', 1, N'architecture 1', N'1', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (6, N'entity6', 3, N'group 3', 1, N'architecture 1', N'2', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (7, N'entity7', 4, N'group 4', 1, N'architecture 1', N'5', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (8, N'entity8', 4, N'group 4', 1, N'architecture 1', N'5', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (8, N'entity8', 4, N'group 4', 1, N'architecture 1', N'6', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (9, N'entity9', 5, N'group 5', 1, N'architecture 1', N'7', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (10, N'entity10', 5, N'group 5', 1, N'architecture 1', N'8', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (11, N'entity11', 5, N'group 5', 1, N'architecture 1', N'7', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (11, N'entity11', 5, N'group 5', 1, N'architecture 1', N'8', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (12, N'Logs & Files', 1, N'Datasources', 2, N'Big Data Solution', NULL, NULL, NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (13, N'Sensors & IoT', 1, N'Datasources', 2, N'Big Data Solution', NULL, NULL, NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (14, N'Events & Streams', 1, N'Datasources', 2, N'Big Data Solution', NULL, NULL, NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (15, N'Business Apps(Structured Data)', 1, N'Datasources', 2, N'Big Data Solution', NULL, NULL, NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (16, N'Azure Data Factory', 2, N'Ingestion', 2, N'Big Data Solution', N'12', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (16, N'Azure Data Factory', 2, N'Ingestion', 2, N'Big Data Solution', N'15', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (17, N'IoT Hub', 2, N'Ingestion', 2, N'Big Data Solution', N'13', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (18, N'Azure HD Insights', 2, N'Ingestion', 2, N'Big Data Solution', N'13', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (18, N'Azure HD Insights', 2, N'Ingestion', 2, N'Big Data Solution', N'14', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (19, N'Event Hub', 2, N'Ingestion', 2, N'Big Data Solution', N'14', NULL, 1)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (20, N'Azure Blob Storage', 3, N'Data Store', 2, N'Big Data Solution', N'16', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (20, N'Azure Blob Storage', 3, N'Data Store', 2, N'Big Data Solution', N'17', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (20, N'Azure Blob Storage', 3, N'Data Store', 2, N'Big Data Solution', N'18', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (20, N'Azure Blob Storage', 3, N'Data Store', 2, N'Big Data Solution', N'19', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (21, N'Azure DataLake', 3, N'Data Store', 2, N'Big Data Solution', N'16', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (21, N'Azure DataLake', 3, N'Data Store', 2, N'Big Data Solution', N'17', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (21, N'Azure DataLake', 3, N'Data Store', 2, N'Big Data Solution', N'18', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (21, N'Azure DataLake', 3, N'Data Store', 2, N'Big Data Solution', N'19', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 3, N'Data Store', 2, N'Big Data Solution', N'17', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 3, N'Data Store', 2, N'Big Data Solution', N'18', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 3, N'Data Store', 2, N'Big Data Solution', N'19', NULL, 2)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (23, N'Azure Machine Learning', 4, N'Train and Prepare', 2, N'Big Data Solution', N'20', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (23, N'Azure Machine Learning', 4, N'Train and Prepare', 2, N'Big Data Solution', N'21', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (23, N'Azure Machine Learning', 4, N'Train and Prepare', 2, N'Big Data Solution', N'22', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (24, N'Stream Analytics', 4, N'Train and Prepare', 2, N'Big Data Solution', N'20', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (18, N'Azure HD Insights', 4, N'Train and Prepare', 2, N'Big Data Solution', N'20', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (18, N'Azure HD Insights', 4, N'Train and Prepare', 2, N'Big Data Solution', N'21', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (25, N'Azure Data Bricks', 4, N'Train and Prepare', 2, N'Big Data Solution', N'20', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (25, N'Azure Data Bricks', 4, N'Train and Prepare', 2, N'Big Data Solution', N'21', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (26, N'Azure Functions', 4, N'Train and Prepare', 2, N'Big Data Solution', N'20', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (26, N'Azure Functions', 4, N'Train and Prepare', 2, N'Big Data Solution', N'22', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (27, N'Azure Data Lake Analytics', 4, N'Train and Prepare', 2, N'Big Data Solution', N'20', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (27, N'Azure Data Lake Analytics', 4, N'Train and Prepare', 2, N'Big Data Solution', N'21', NULL, 3)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (28, N'Azure SQL DB', 5, N'Modeling', 2, N'Big Data Solution', N'24', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (28, N'Azure SQL DB', 5, N'Modeling', 2, N'Big Data Solution', N'18', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (28, N'Azure SQL DB', 5, N'Modeling', 2, N'Big Data Solution', N'25', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (29, N'Azure DW', 5, N'Modeling', 2, N'Big Data Solution', N'24', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (29, N'Azure DW', 5, N'Modeling', 2, N'Big Data Solution', N'18', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (29, N'Azure DW', 5, N'Modeling', 2, N'Big Data Solution', N'25', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (29, N'Azure DW', 5, N'Modeling', 2, N'Big Data Solution', N'26', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 5, N'Modeling', 2, N'Big Data Solution', N'18', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 5, N'Modeling', 2, N'Big Data Solution', N'23', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 5, N'Modeling', 2, N'Big Data Solution', N'24', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 5, N'Modeling', 2, N'Big Data Solution', N'25', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 5, N'Modeling', 2, N'Big Data Solution', N'26', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (22, N'Azure CosmosDB', 5, N'Modeling', 2, N'Big Data Solution', N'27', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (18, N'Azure HD Insights', 5, N'Modeling', 2, N'Big Data Solution', N'18', NULL, 4)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (30, N'PowerBI', 6, N'Publish and Report', 2, N'Big Data Solution', N'28', NULL, 5)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (30, N'PowerBI', 6, N'Publish and Report', 2, N'Big Data Solution', N'29', NULL, 5)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (30, N'PowerBI', 6, N'Publish and Report', 2, N'Big Data Solution', N'22', NULL, 5)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (30, N'PowerBI', 6, N'Publish and Report', 2, N'Big Data Solution', N'18', NULL, 5)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (31, N'WebApps', 6, N'Publish and Report', 2, N'Big Data Solution', N'28', NULL, 5)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (31, N'WebApps', 6, N'Publish and Report', 2, N'Big Data Solution', N'29', NULL, 5)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (31, N'WebApps', 6, N'Publish and Report', 2, N'Big Data Solution', N'22', NULL, 5)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url], [parent_group_id]) VALUES (32, N'Microsoft Excel', 6, N'Publish and Report', 2, N'Big Data Solution', N'29', NULL, 5)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (1, N'Do you need entity1 in your architecture solution?', N'yes|no', 1, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (2, N'Do you need entity2 in your architecture solution?', N'yes|no', 1, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (3, N'Do you need entity3 in your architecture solution ?', N'yes|no', 2, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (4, N'Do you need entity4 in your architecture solution ?', N'yes|no', 2, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (5, N'Do you need entity5 in your architecture solution ?', N'yes|no', 3, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (6, N'Do you need entity6 in your architecture solution ?', N'yes|no', 3, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (7, N'Do you need entity7 in your architecture solution ?', N'yes|no', 4, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (8, N'Do you need entity8 in your architecture solution ?', N'yes|no', 4, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (9, N'Do you need entity9 in your architecture solution ?', N'yes|no', 5, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (10, N'Do you need entity10 or  entity 11 in your architecture solution ?', N'yes|no', 5, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (11, N'Do you need entity11 in your architecture solution ?', N'yes|no', 5, 1)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (12, N'Do you want to design your visualizations and reports while offline?', N'Yes|no', 6, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (13, N'Do you want to to embed dynamic visualizations in an external website or application?', N'Yes|no', 6, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (14, N'Do you need to connect to numerous data sources?', N'Yes|no', 6, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (15, N'Do you need file storage that is optimized for parallel analytics workloads and high throughput/IOPS', N'Yes|no', 3, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (16, N'Do you need to store unstructured or semi-structured data in a schemaless database?', N'Yes|no', 3, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (17, N'Do you need managed, high speed, cloud-based storage for any type of data?', N'Yes|no', 3, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (18, N'What kind of data you are processing?', N'RealTime|NonRealTime', 1, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (19, N'Do you want to use Machine Learning in your project?', N'Yes|no', 4, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (20, N'Do you want to use Row Level security?', N'Yes|no', 5, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (21, N'Do you want to use memory caching? ', N'Yes|no', 5, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (22, N'What kind of data you are processing?', N'Relational|NonRelational', 5, 2)
INSERT [dbo].[tblQuestions] ([question_id], [description], [choices], [group_id], [architecture_id]) VALUES (23, N'Do you want to use Two-way Communication ?', N'Yes|no', 2, 2)
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (1, 1, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (2, 2, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (3, 3, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (4, 4, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (5, 5, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (6, 6, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (7, 7, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (8, 8, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (9, 9, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (10, 10, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (10, 11, N'no')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (11, 11, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (12, 30, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (12, 31, N'no')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (12, 32, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (13, 30, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (13, 31, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (13, 32, N'no')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (14, 30, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (14, 32, N'no')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (15, 20, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (15, 21, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (16, 22, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (17, 20, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (17, 21, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (18, 12, N'no')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (18, 13, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (18, 14, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (19, 23, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (19, 26, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (19, 25, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (20, 28, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (20, 18, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (20, 22, N'no')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (21, 28, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (21, 18, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (22, 29, N'yes')
INSERT [dbo].[tblQuestionToEntityMap] ([question_id], [entity_id], [option]) VALUES (23, 17, N'yes')
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 1, 2, N'con1')
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 1, 3, N'con2')
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 2, NULL, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 3, 4, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 4, 5, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 5, NULL, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (2, 1, NULL, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (2, 2, 1, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (2, 3, 2, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (2, 4, 3, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (2, 5, 4, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (2, 6, 5, NULL)
/****** Object:  StoredProcedure [dbo].[usp_GetArchitectureDetails]    Script Date: 11/23/2018 7:02:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetArchitectureDetails] @architecture_id tinyint
     
AS   
   SET NOCOUNT ON;  
	SELECT 
     AE.[architecture_id]
	,AE.[architecture_name]
	,AE.[group_id]
	,AE.[parent_group_id]
	,RG.[related_group]
	,RG.[connector]
	,AE.[group_name]
	,AE.[entity_id]
	,AE.[parent_entities]
	,AE.[entity_name]
	,QTE.[question_id]
FROM [dbo].[tblAzureEntities] AS AE
INNER JOIN [dbo].[tblQuestionToEntityMap] AS QTE ON AE.[entity_id] = QTE.[entity_id]
INNER JOIN [dbo].[tblRelatedGroups] AS RG ON (AE.[architecture_id] = RG.[architecture_id] AND AE.[group_id] = RG.[group_id])
WHERE AE.[architecture_id] = @architecture_id
ORDER BY AE.[architecture_id]
	,AE.[group_id]
	,AE.[entity_id]
	,RG.[related_group]
	,AE.[parent_group_id]


GO
/****** Object:  StoredProcedure [dbo].[Usp_GetArchitecturesList]    Script Date: 11/23/2018 7:02:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Usp_GetArchitecturesList] 
AS 
    SELECT DISTINCT architecture_id, 
                    architecture_name 
    FROM   [dbo].[tblazureentities] 

GO
/****** Object:  StoredProcedure [dbo].[usp_GetQuestionDetails]    Script Date: 11/23/2018 7:02:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_GetQuestionDetails] @architecture_id tinyint
     
AS   
   SET NOCOUNT ON;  
   SELECT 
    [architecture_id],
	[group_id],
	[question_id],
	[description],
	[choices]
FROM [dbo].[tblQuestions] 
WHERE [architecture_id] = @architecture_id
ORDER BY [architecture_id],
	[group_id],
	[question_id]

GO
/****** Object:  StoredProcedure [dbo].[usp_GetQuestionEntityMapping]    Script Date: 11/23/2018 7:02:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_GetQuestionEntityMapping] 
     
AS   
   SET NOCOUNT ON;  
   SELECT 
	[question_id],
	[entity_id],
	[option]
FROM [dbo].[tblQuestionToEntityMap]
ORDER BY [question_id],
		[entity_id]


GO
