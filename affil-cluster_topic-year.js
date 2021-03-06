const spec = 	{
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",
  "autosize": "pad",
  "padding": 5,
  "style": "cell",
  "signals": [
    {
      "name": "currentTid",
      "value": "mdrtb",
      "bind": {
        "name": "Main topic:",
        "input": "radio",
        "options": [
          "mdrtb",
          "t5",
          "t1"
        ]
      }
    },
    {
      "name": "cComm",
      "value": "c10",
      "bind": {
        "name": "Affiliation clusters:",
        "input": "radio",
        "options": [
          "c10",
          "c5",
          "c4",
          "c0",
          "c47",
          "c19",
          "c2",
          "c11",
          "c13",
          "c7",
          "c101",
          "c18",
          "c8",
          "c31"
        ]
      }
    },
    {
      "name": "x_step",
      "value": 20
    },
    {
      "name": "width",
      "update": "bandspace(domain('x').length, 0.1, 0.05) * x_step"
    },
    {
      "name": "y_step",
      "value": 20
    },
    {
      "name": "height",
      "update": "bandspace(domain('y').length, 0.1, 0.05) * y_step"
    }
  ],
  "data": [
    {
      "name": "source_raw",
      "url": "https://raw.githubusercontent.com/repmax/launchpad/master/affil-cluster_topic_matrix.tsv",
      "format": {
        "type": "tsv",
        "parse": {
          "weight": "number",
          "year": "string"
        }
      }
    },
    {
      "name": "source_scale",
      "source": "source_raw",
      "transform": [
        {
          "type": "filter",
          "expr": "datum.theme == currentTid"
        }
      ]
    },
    {
      "name": "source_in",
      "source": "source_raw",
      "transform": [
        {
          "type": "filter",
          "expr": "(datum.theme == currentTid) && (datum.cluster == cComm)"
        }
      ]
    }
  ],
  "marks": [
    {
      "name": "marks",
      "type": "rect",
      "style": [
        "rect"
      ],
      "from": {
        "data": "source_in"
      },
      "encode": {
        "update": {
          "fill": {
            "scale": "color",
            "field": "weight"
          },
          "x": {
            "scale": "x",
            "field": "year"
          },
          "width": {
            "scale": "x",
            "band": true
          },
          "y": {
            "scale": "y",
            "field": "name"
          },
          "height": {
            "scale": "y",
            "band": true
          }
        }
      }
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "domain": [
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017
      ],
      "range": {
        "step": {
          "signal": "x_step"
        }
      },
      "paddingInner": 0.1,
      "paddingOuter": 0.05
    },
    {
      "name": "y",
      "type": "band",
      "domain": {
        "data": "source_scale",
        "field": "name",
        "sort": false
      },
      "range": {
        "step": {
          "signal": "y_step"
        }
      },
      "paddingInner": 0.1,
      "paddingOuter": 0.05
    },
    {
      "name": "color",
      "type": "sequential",
      "range": {
        "scheme": "YellowOrangeRed"
      },
      "domain": {
        "data": "source_in",
        "field": "weight"
      },
      "nice": false,
      "zero": true
    }
  ],
  "axes": [
    {
      "scale": "x",
      "orient": "bottom",
      "title": "year",
      "labelOverlap": false,
      "encode": {
        "labels": {
          "update": {
            "angle": {
              "value": 310
            },
            "align": {
              "value": "right"
            },
            "baseline": {
              "value": "middle"
            }
          }
        }
      },
      "zindex": 1
    },
    {
      "scale": "y",
      "orient": "left",
      "title": "name",
      "zindex": 1
    }
  ],
  "legends": [
    {
      "orient": "right",
      "offset": 10,
      "fill": "color",
      "title": "weight",
      "type": "gradient"
    }
  ],
  "config": {
    "axisY": {
      "minExtent": 30
    }
  }
}
draw = function () { 
  vegaEmbed('#vis', spec, {renderer: "svg"});
}
