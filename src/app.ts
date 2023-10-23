import express, { Request, Response } from 'express';
import { sequelize } from './database';
import { QueryTypes } from 'sequelize';
import * as bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 3000;

// Set up body-parser and cors middlewares
app.use(bodyParser.json());
app.use(cors());

app.post('/search', async (req: Request, res: Response) => {

  const searchValue = req.body.searchValue;
  console.log('jj')
  console.log(searchValue);
  try {
    await sequelize.authenticate();
    const query = `SELECT [HDPOSsmartV2].[dbo].[tbl_DYN_Items].[Barcode] , [HDPOSsmartV2].[dbo].[tbl_DYN_Items].[Name],[RatePerUnit],[QuantityRequired],[FreeItemsQuantity],[TotalQuantity] FROM [HDPOSsmartV2].[dbo].[tbl_DYN_POs] INNER JOIN [HDPOSsmartV2].[dbo].[tbl_DYN_POs_POItems] ON [HDPOSsmartV2].[dbo].[tbl_DYN_POs].[Id] = [HDPOSsmartV2].[dbo].[tbl_DYN_POs_POItems].[POId] INNER JOIN [HDPOSsmartV2].[dbo].[tbl_DYN_POItems] ON [HDPOSsmartV2].[dbo].[tbl_DYN_POs_POItems].POItemId = [HDPOSsmartV2].[dbo].[tbl_DYN_POItems].Id INNER JOIN [HDPOSsmartV2].[dbo].[tbl_DYN_POItems_Items] ON [HDPOSsmartV2].[dbo].[tbl_DYN_POItems].Id = [HDPOSsmartV2].[dbo].[tbl_DYN_POItems_Items].POItemId INNER JOIN [HDPOSsmartV2].[dbo].[tbl_DYN_Items] ON [HDPOSsmartV2].[dbo].[tbl_DYN_POItems_Items].ItemId = [HDPOSsmartV2].[dbo].[tbl_DYN_Items].Id WHERE [HDPOSsmartV2].[dbo].[tbl_DYN_POs].[PONumber] = '${searchValue}' ORDER BY [HDPOSsmartV2].[dbo].[tbl_DYN_Items].[Name]`;
    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    res.send(JSON.stringify(results, null, 2));
    console.log(results)
  } catch (error) {
    console.error('Failed to connect or execute query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/stock', async (req, res) => {
  const searchValue = req.body.searchValue;

  try {
    await sequelize.authenticate();
    const query = `SELECT [HDPOSsmartV2].[dbo].[tbl_DYN_Items].[Name], [HDPOSsmartV2].[dbo].[tbl_DYN_Warehouses].[Name], [HDPOSsmartV2].[dbo].[tbl_DYN_QuickStocks].[Quantity] FROM [HDPOSsmartV2].[dbo].[tbl_DYN_Items] INNER JOIN [HDPOSsmartV2].[dbo].[tbl_DYN_QuickStocks] ON [HDPOSsmartV2].[dbo].[tbl_DYN_Items].[Id] = [HDPOSsmartV2].[dbo].[tbl_DYN_QuickStocks].[ItemNumber] INNER JOIN [HDPOSsmartV2].[dbo].[tbl_DYN_Warehouses] ON [HDPOSsmartV2].[dbo].[tbl_DYN_QuickStocks].[WarehouseNumber] = [HDPOSsmartV2].[dbo].[tbl_DYN_Warehouses].Id WHERE [HDPOSsmartV2].[dbo].[tbl_DYN_Items].[Name] = '${searchValue}';`;
    
    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    
    res.json(results); // Sending results as JSON response
  } catch (error) {
    console.error('Failed to connect or execute query:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Sending an error response as JSON
  }
});

app.post('/suggestion', async (req, res) => {
  const searchValue = req.body.searchValue;

  try {
    await sequelize.authenticate();
    const query = `SELECT [HDPOSsmartV2].[dbo].[tbl_DYN_Items].[Name] FROM [HDPOSsmartV2].[dbo].[tbl_DYN_Items] WHERE [HDPOSsmartV2].[dbo].[tbl_DYN_Items].[Name] LIKE '%${searchValue}%'`;
    
    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    
    res.json(results); // Sending results as JSON response
  } catch (error) {
    console.error('Failed to connect or execute query:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Sending an error response as JSON
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
