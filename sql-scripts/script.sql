USE [Azure_Architecture_Suggestion]
GO
/****** Object:  Table [dbo].[tblAzureEntities]    Script Date: 20-11-2018 06:39:55 ******/
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
	[entity_image_url] [nvarchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblQuestions]    Script Date: 20-11-2018 06:39:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblQuestions](
	[question_id] [int] NOT NULL,
	[description] [varchar](100) NULL,
	[choices] [varchar](100) NULL,
	[group_id] [int] NOT NULL,
	[architecture_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblQuestionToEntityMap]    Script Date: 20-11-2018 06:39:55 ******/
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
/****** Object:  Table [dbo].[tblRelatedGroups]    Script Date: 20-11-2018 06:39:55 ******/
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
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (1, N'entity1', 1, N'group 1', 1, N'architecture 1', NULL, NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (2, N'entity2', 1, N'group 1', 1, N'architecture 1', NULL, NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (3, N'entity3', 2, N'group 2', 1, N'architecture 1', N'1', NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (4, N'entity4', 2, N'group 2', 1, N'architecture 1', N'2', NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (5, N'entity5', 3, N'group 3', 1, N'architecture 1', N'1', NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (6, N'entity6', 3, N'group 3', 1, N'architecture 1', N'2', NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (7, N'entity7', 4, N'group 4', 1, N'architecture 1', N'5', NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (8, N'entity8', 4, N'group 4', 1, N'architecture 1', N'5,6', NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (9, N'entity9', 5, N'group 5', 1, N'architecture 1', N'7', NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (10, N'entity10', 5, N'group 5', 1, N'architecture 1', N'8', NULL)
INSERT [dbo].[tblAzureEntities] ([entity_id], [entity_name], [group_id], [group_name], [architecture_id], [architecture_name], [parent_entities], [entity_image_url]) VALUES (11, N'entity11', 5, N'group 5', 1, N'architecture 1', N'7,8', NULL)
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
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 1, 2, N'con1')
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 1, 3, N'con2')
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 2, NULL, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 3, 4, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 4, 5, NULL)
INSERT [dbo].[tblRelatedGroups] ([architecture_id], [group_id], [related_group], [connector]) VALUES (1, 5, NULL, NULL)
/****** Object:  StoredProcedure [dbo].[usp_GetArchitectureDetails]    Script Date: 20-11-2018 06:39:55 ******/
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


GO
/****** Object:  StoredProcedure [dbo].[Usp_GetArchitecturesList]    Script Date: 20-11-2018 06:39:55 ******/
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
/****** Object:  StoredProcedure [dbo].[usp_GetQuestionDetails]    Script Date: 20-11-2018 06:39:55 ******/
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
/****** Object:  StoredProcedure [dbo].[usp_GetQuestionEntityMapping]    Script Date: 20-11-2018 06:39:55 ******/
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
